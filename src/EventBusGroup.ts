import { IEventBusConnector, IEventBusPublisher } from "./EventBus";
import { IConsumerConnector, IConsumerHandler } from "./Consumer";
import Promise = require("bluebird");
import { Options } from "amqplib";

export function eventBusGroup
    (
        eventBusConnector: IEventBusConnector, 
        consumerConnector: IConsumerConnector,
        options: Options.Connect,
        index: number
    ) : Promise<[IEventBusPublisher, IConsumerHandler]> {

        return new Promise<[IEventBusPublisher, IConsumerHandler]>((resolve, reject) => {
            Promise.all<IEventBusPublisher, IConsumerHandler>([eventBusConnector.Connect(options), consumerConnector.Connect(options, index)])
                .then(([eventBusPublisher, consumerHandler]) => {
                    resolve([eventBusPublisher, consumerHandler]);
                })
                .catch(e => {
                    reject(e);
                });
        });

        throw new Error();
}