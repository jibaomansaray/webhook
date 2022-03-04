
import { NextFunction, Request, Response } from "express";
import { eventRepo } from '../repos'

export class EventController {

  private repo = eventRepo();

  async all(request: Request, response: Response, next: NextFunction) {
    return this.repo.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const record = await this.repo.findOne(request.params.id);

    if (record) {
      return record;
    } else {
      response.status(404);
      response.json({ error: 'not found' })
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    response.status(400);
    response.json({ error: 'use the "dispatches" endpoint' });
  }

  async update(request: Request, response: Response, next: NextFunction) {
    response.status(400);
    response.json({ error: 'cannot update a dispatched event' });
  }

  remove(request: Request, response: Response, next: NextFunction) {
    response.status(400);
    response.json({ error: 'cannot delete a dispatched event' });
  }
}