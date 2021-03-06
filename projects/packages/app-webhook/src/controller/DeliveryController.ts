
import { NextFunction, Request, Response } from "express";
import { deliveryRepo } from '../repos'

export class DeliveryController {

  private repo = deliveryRepo();

  async all(request: Request, response: Response, next: NextFunction) {
    return this.repo.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const record = await this.repo.findOne(request.params.id);

    if (record) {
      return record
    } else {
      response.status(404);
      response.json({ error: 'not found' })
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.repo.save(request.body);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const record = await this.repo.findOne(request.params.id);
    if (record) {
      return await this.repo.update(record.id, request.body);
    } else {
      response.status(404);
      response.json({ error: 'not found' });
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const userToRemove = await this.repo.findOne(request.params.id);
    return await this.repo.softDelete(userToRemove);
  }
}