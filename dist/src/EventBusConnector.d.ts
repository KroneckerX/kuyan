import { IEventBusConnector, IEventBusPublisher } from "./EventBus";
import Promise = require('bluebird');
import { Options } from "amqplib";
export declare class EventBusConnector implements IEventBusConnector {
    private readonly Exchanges;
    constructor(exchanges: Array<string>);
    Connect(options: Options.Connect): Promise<IEventBusPublisher>;
}
