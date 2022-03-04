
import { NextFunction, Request, Response } from "express";
import { WebhookTopic } from "../entity/WebhookTopic";
import { endpointRepo, topicRepo } from '../repos'
import { ApiControllerHelper } from "./ApiControllerHelper";

export class EndpointController {

  private repo = endpointRepo();

  async all(request: Request, response: Response, next: NextFunction) {
    const app = await ApiControllerHelper.fetchApp(request, response);
    if (app) {
      return this.repo.find();
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const app = await ApiControllerHelper.fetchApp(request, response);

    const record = await this.repo.findOne(request.params.id);

    if (record) {
      return record
    } else {
      response.status(404);
      response.json({ error: 'not found' })
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const app = await ApiControllerHelper.fetchApp(request, response);
    const topicIdOrName = request.body.topic;
    let topic: WebhookTopic;

    if (!app) {
      return;
    }

    if (!isNaN(topicIdOrName)) {
      topic = await topicRepo().findOneByIdAndApp(topicIdOrName, app);
    } else {
      topic = await topicRepo().findOneByNameAndApp(topicIdOrName, app);
    }

    if (topic) {
      request.body.isActive = true;
      request.body.app = app.id;
      request.body.topic = topic.id;

      try {
        return await this.repo.save(request.body);
      } catch (e) {
        response.status(400);
        response.json({ error: e.message })
      }
    } 

    response.status(404);
    response.json({ error: 'topic does not exist' })
  }

  async update(request: Request, response: Response, next: NextFunction) {
    response.status(400);
    response.json({ error: 'you are not allowed to update a registered endpoint' });
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const app = await ApiControllerHelper.fetchApp(request, response);
    const topicIdOrName = request.params.topic;
    let topic: WebhookTopic;

    if (!app) {
      return;
    }

    if (!isNaN(topicIdOrName)) {
      topic = await topicRepo().findOneByIdAndApp(topicIdOrName, app);
    } else {
      topic = await topicRepo().findOneByNameAndApp(topicIdOrName, app);
    }

    const record = await this.repo.findOne(request.params.id);

    if (record.app === app.id && record.topic === topic.id) {
      return await this.repo.softRemove(record);
    }

    response.status(400);
    response.json({ error: 'app or topic is wrong' });

  }
}