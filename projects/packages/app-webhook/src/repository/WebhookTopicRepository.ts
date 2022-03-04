import {EntityRepository, Repository} from "typeorm";
import { WebhookApp } from "../entity/WebhookApp";
import { WebhookTopic } from '../entity/WebhookTopic';

@EntityRepository(WebhookTopic)
export class WebhookTopicRepository extends Repository<WebhookTopic> {
  
  public async findOneByName(name: string): Promise<WebhookTopic | undefined> {
    return this.findOne({ name });
  }

  public async findOneByIdAndApp(id: number, app: WebhookApp): Promise<WebhookTopic | undefined > {
    return this.findOne({
      id,
      app: app.id
    });
  }

  public async findOneByNameAndApp(name: string, app: WebhookApp): Promise<WebhookTopic | undefined > {
    return this.findOne({
      name,
      app: app.id
    });
  }

  public async findByApp(app: WebhookApp): Promise<WebhookTopic[]> {
    return this.find({
      app: app.id
    });
  }
}