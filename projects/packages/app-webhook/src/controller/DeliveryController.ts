
import { NextFunction, Request, Response } from "express";
import { deliveryRepo as repo } from 'lib-webhook/src/repos'

export class DeliveryController {

  async all(request: Request, response: Response, next: NextFunction) {
    return repo.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return repo.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return repo.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await repo.findOne(request.params.id);
    await repo.remove(userToRemove);
  }
}