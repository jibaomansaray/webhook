import {EntityRepository, Repository} from "typeorm";
import { WebhookEvent } from '../entity/WebhookEvent';

@EntityRepository(WebhookEvent)
export class WebhookEventRepository extends Repository<WebhookEvent> {

}