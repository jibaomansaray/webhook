import { Request, Response } from "express";
import { WebhookApp } from "../entity/WebhookApp";
import { appRepo } from '../repos'

export class ApiControllerHelper {

  public static async fetchApp(request: Request, response: Response): Promise<WebhookApp | false> {
    const app = await appRepo().findOneByHash(request.params.app);
    if (!app) {
      response.status(404);
      response.json({ error: 'app hash does not exist' });
      return false;
    }
    return app;
  }

}