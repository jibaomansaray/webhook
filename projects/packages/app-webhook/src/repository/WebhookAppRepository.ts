
import {EntityRepository, Repository} from "typeorm";
import { WebhookApp } from "../entity/WebhookApp";

@EntityRepository(WebhookApp)
export class WebhookAppRepository extends Repository<WebhookApp> {

}