import {EntityRepository, Repository} from "typeorm";
import { WebhookTopic } from '../entity/WebhookTopic';

@EntityRepository(WebhookTopic)
export class WebhookTopicRepository extends Repository<WebhookTopic> {
  
}