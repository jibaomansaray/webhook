import { getCustomRepository } from "typeorm";
import { WebhookAppRepository } from "./Repository/WebhookAppRepository";
import { WebhookDeliveryRepository } from "./Repository/WebhookDeliveryRespository";
import { WebhookEndpointRespository } from "./Repository/WebhookEndpointRespository";

export const appRepo = getCustomRepository(WebhookAppRepository);

export const deliveryRepo = getCustomRepository(WebhookDeliveryRepository);

export const endpointRepo = getCustomRepository(WebhookEndpointRespository);

export const eventRepo = getCustomRepository(WebhookEndpointRespository);

export const topicRepo = getCustomRepository(WebhookEndpointRespository);