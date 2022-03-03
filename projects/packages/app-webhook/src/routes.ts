import { EntityRepository } from "typeorm";
import { AppController } from "./controller/AppController";
import { DeliveryController } from "./controller/DeliveryController";
import { EventController } from './controller/EventController';
import { TopicController } from './controller/TopicController';

const generateRoutes = (endpoint: string, controller: unknown) => {

    return [
        {
            method: "get",
            route: `/${endpoint}`,
            controller,
            action: "all"
        },
        {
            method: "get",
            route: `/${endpoint}/:id`,
            controller,
            action: "one"
        },
        {
            method: "post",
            route: `/${endpoint}`,
            controller,
            action: "save"
        },
        {
            method: "put",
            route: `/${endpoint}/:id`,
            controller,
            action: "update"
        },
        {
            method: "delete",
            route: `/${endpoint}/:id`,
            controller,
            action: "remove"
        }
    ];
}

export const Routes = [
    ...generateRoutes('api/apps', AppController),
    ...generateRoutes('api/deliveries', DeliveryController),
    ...generateRoutes('api/endpoints', EntityRepository),
    ...generateRoutes('api/events', EventController),
    ...generateRoutes('api/topics', TopicController)
]