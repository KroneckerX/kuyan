import { Options } from "amqplib";
import Promise = require('bluebird');
export interface IEventBusConnector {
    Connect(options: Options.Connect): Promise<IEventBusPublisher>;
}
export declare class ExchangeEvent {
    Exchange: string;
    Content: Buffer;
    Routing: string;
}
export interface IEventBusPublisher {
    Publish(event: ExchangeEvent): boolean;
}
