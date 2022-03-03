import {EntityRepository, Repository} from "typeorm";
import { WebhookEndpoint } from '../entity/WebhookEndpoint';

@EntityRepository(WebhookEndpoint)
export class WebhookEndpointRespository extends Repository<WebhookEndpoint> {

}