
import {EntityRepository, Repository} from "typeorm";
import { WebhookApp } from "../entity/WebhookApp";

@EntityRepository(WebhookApp)
export class WebhookAppRepository extends Repository<WebhookApp> {

  public async findOneByHash(hash: string): Promise<WebhookApp| undefined> {
    return this.findOne({ hash });
  }
}