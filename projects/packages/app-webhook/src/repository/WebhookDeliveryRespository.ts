import {EntityRepository, Repository} from "typeorm";
import { WebhookDelivery } from '../entity/WebhookDelivery';

@EntityRepository(WebhookDelivery)
export class WebhookDeliveryRepository extends Repository<WebhookDelivery> {

}