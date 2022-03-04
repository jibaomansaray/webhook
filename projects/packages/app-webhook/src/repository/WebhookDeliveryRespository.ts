import { EntityRepository, Repository } from "typeorm";
import { WebhookDelivery } from '../entity/WebhookDelivery';
import { DeliveryStatus } from "../types/deliverystatus";

@EntityRepository(WebhookDelivery)
export class WebhookDeliveryRepository extends Repository<WebhookDelivery> {


  public async findByStatus(status: DeliveryStatus, limit = 200, where: { [key: string]: unknown } = {}): Promise<WebhookDelivery[]> {
    return this.createQueryBuilder()
      .leftJoinAndSelect("WebhookDelivery.endpoint", "WebhookEndpoint")
      .leftJoinAndSelect("WebhookDelivery.event", "WebhookEvent")
      .where({
        status,
        ...where
      })
      .andWhere("WebhookEndpoint.isActive = :isActive", { isActive: true })
      .limit(limit || 200)
      .getMany()
  }

  public async findByStatusAndNextAttempt(status: DeliveryStatus, next: Date, limit = 200): Promise<WebhookDelivery[]> {
    return this.createQueryBuilder()
      .leftJoinAndSelect("WebhookDelivery.endpoint", "WebhookEndpoint")
      .leftJoinAndSelect("WebhookDelivery.event", "WebhookEvent")
      .where(`status = :status and nextAttempt <= :next`, { status, next })
      .andWhere("WebhookEndpoint.isActive = :isActive", { isActive: true })
      .limit(limit || 200)
      .getMany()
  }

}