import { IEventBusConnector, IEventBusPublisher } from "./EventBus";
import { IConsumerConnector, IConsumerHandler } from "./Consumer";
import Promise = require("bluebird");
import { Options } from "amqplib";
export declare function eventBusGroup(eventBusConnector: IEventBusConnector, consumerConnector: IConsumerConnector, options: Options.Connect, index: number): Promise<[IEventBusPublisher, IConsumerHandler]>;
