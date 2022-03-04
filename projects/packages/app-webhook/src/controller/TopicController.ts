
import { NextFunction, Request, Response } from "express";
import { topicRepo } from '../repos'
import { ApiControllerHelper } from "./ApiControllerHelper";

export class TopicController {

  private repo = topicRepo();

  async all(request: Request, response: Response, next: NextFunction) {
    const app = await ApiControllerHelper.fetchApp(request, response);
    if (app) {
      return this.repo.findByApp(app);
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const app = await ApiControllerHelper.fetchApp(request, response);

    if (app) {
      const record = await this.repo.findOneByIdAndApp(request.params.id, app);

      if (record) {
        return record;
      } else {
        response.status(404);
        response.json({ error: 'not found' })
      }
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const app = await ApiControllerHelper.fetchApp(request, response);
    if (app) {
      request.body.app = app.id
      const existing = await this.repo.findOneByNameAndApp(request.body.name, app);
      if (existing) {
        response.status(404);
        response.json({ error: 'a topic with this name already exist' });
        return;
      }

      return this.repo.save(request.body);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const app = await ApiControllerHelper.fetchApp(request, response);
    if (app) {
      const record = await this.repo.findOneByIdAndApp(request.params.id, app);
      if (record) {
        request.body.name = record.name;
        return await this.repo.update(record.id, request.body);
      } else {
        response.status(404);
        response.json({ error: 'not found' });
      }
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const app = await ApiControllerHelper.fetchApp(request, response);
    if (app) {
      const record = await this.repo.findOneByIdAndApp(request.params.id, app);
      if (record) {
        return await this.repo.softRemove(record);
      }

      response.status(404);
      response.json({ error: 'not found' });
    }
  }
}