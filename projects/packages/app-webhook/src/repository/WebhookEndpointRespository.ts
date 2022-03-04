import {EntityRepository, Repository} from "typeorm";
import { ReadStream } from "typeorm/platform/PlatformTools";
import { WebhookApp } from "../entity/WebhookApp";
import { WebhookEndpoint } from '../entity/WebhookEndpoint';
import { WebhookTopic } from "../entity/WebhookTopic";

@EntityRepository(WebhookEndpoint)
export class WebhookEndpointRespository extends Repository<WebhookEndpoint> {

  public findByApp(app: WebhookApp | number): Promise<WebhookEndpoint[]> {
    return this.find({
      app: (typeof app === 'number')? app: app.id
    })
  }


  public findByAppStram(app: WebhookApp | number, where: {[key:string]: unknown} = {}): Promise<ReadStream> {
    return this.createQueryBuilder()
      .where({
        app: (typeof app === 'number') ? app : app.id,
        ...where
      }).stream();
  }

  public findByAppAndTopic(app: WebhookApp | number, topic: WebhookTopic | number): Promise<WebhookEndpoint[]> {
    return this.find({
      app: (typeof app === 'number')? app: app.id,
      topic: (typeof topic === 'number') ? topic : topic.id
    })
  }


  public findByAppAndTopicStream(app: WebhookApp | number, topic: WebhookTopic | number, where: {[key:string]: unknown} = {}): Promise<ReadStream> {
    return this.createQueryBuilder()
      .where({
        app: (typeof app === 'number') ? app : app.id,
        topic: (typeof topic === 'number') ? topic : topic.id,
        ...where
      }).stream();
  }

}