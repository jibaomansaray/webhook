import { getCustomRepository } from "typeorm";
import { WebhookAppRepository } from "./repository/WebhookAppRepository";
import { WebhookDeliveryRepository } from "./repository/WebhookDeliveryRespository";
import { WebhookEndpointRespository } from "./repository/WebhookEndpointRespository";
import { WebhookEventRepository } from "./repository/WebhookEventRepository";
import { WebhookTopicRepository } from "./repository/WebhookTopicRepository";


export const appRepo = (): WebhookAppRepository =>  getCustomRepository(WebhookAppRepository);

export const deliveryRepo = (): WebhookDeliveryRepository =>  getCustomRepository(WebhookDeliveryRepository);

export const endpointRepo = (): WebhookEndpointRespository =>  getCustomRepository(WebhookEndpointRespository);

export const eventRepo = (): WebhookEventRepository => getCustomRepository(WebhookEventRepository);

export const topicRepo = (): WebhookTopicRepository => getCustomRepository(WebhookTopicRepository);