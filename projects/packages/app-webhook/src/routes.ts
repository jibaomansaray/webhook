import { EntityRepository } from "typeorm";
import { AppController } from "./controller/AppController";
import { DeliveryController } from "./controller/DeliveryController";
import { EventController } from './controller/EventController';
import { TopicController } from './controller/TopicController';
import { DispatchController } from './controller/DispatchController';

const generateRoutes = (endpoint: string, controller: unknown, viaApp: boolean = false) => {

    return [
        {
            method: "get",
            route: (viaApp)? `/${endpoint}/:app`: `/${endpoint}`,
            controller,
            action: "all",
            name: 'get_all'
        },
        {
            method: "get",
            route: (viaApp)? `/${endpoint}/:app/:id`: `/${endpoint}/:id`,
            controller,
            action: "one",
            name: 'get_one'
        },
        {
            method: "post",
            route: (viaApp)? `/${endpoint}/:app`: `/${endpoint}`,
            controller,
            action: "save",
            name: 'save_one'
        },
        {
            method: "put",
            route: (viaApp)? `/${endpoint}/:app/:id`: `/${endpoint}/:id`,
            controller,
            action: "update",
            name: 'update_one'
        },
        {
            method: "delete",
            route: (viaApp) ? `/${endpoint}/:app/:id`: `/${endpoint}/:id`,
            controller,
            action: "remove",
            name: 'delete_one'
        }
    ];
}


const dispatchRoutes = [
    {
        method: "post",
        route: '/api/dispatches/:app',
        controller: DispatchController,
        action: "save"
    },
];

export const Routes = [
    ...generateRoutes('api/apps', AppController),
    ...generateRoutes('api/deliveries', DeliveryController, true),
    ...generateRoutes('api/endpoints', EntityRepository, true),
    ...generateRoutes('api/events', EventController, true),
    ...generateRoutes('api/topics', TopicController, true),
    ...dispatchRoutes,
]