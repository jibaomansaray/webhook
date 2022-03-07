import { NextFunction, Request, Response } from "express";
import { WebhookTopic } from "../entity/WebhookTopic";
import { dispatchEvent } from "../queue";
import { appRepo, topicRepo, eventRepo } from '../repos'
import { ApiControllerHelper } from "./ApiControllerHelper";

export class DispatchController {
  private theTopicRepo = topicRepo();
  private theEventRepo = eventRepo();

  async save(request: Request, response: Response, next: NextFunction) {
    const app = await ApiControllerHelper.fetchApp(request, response);

    if (!app) {
      return;
    }

    if (!request.body.topic) {
      response.status(400);
      response.json({ error: 'topic not specified' });
      return;
    }

    if (typeof request.body.payload !== 'object') {
      response.status(400);
      response.json({ error: 'payload must be a json object' });
      return;
    }

    let topic: WebhookTopic;

    if (!isNaN(request.body.topic)) {
      topic = await this.theTopicRepo.findOneByIdAndApp(request.body.topic, app);
    } else {
      topic = await this.theTopicRepo.findOneByNameAndApp(request.body.topic, app);
    }


    if (!topic) {
      response.status(404);
      response.json({ error: 'topic does not exist' });
      return;
    }

    const event = await this.theEventRepo.save({
      payload: JSON.stringify({ topic: topic.name, payload: request.body.payload }),
      topic: topic.id
    });

    dispatchEvent({
      eventId: event.id,
      topicId: topic.id,
      appId: app.id
    });

    return {
      id: event.id,
      topic: topic.name,
    };

  }
}