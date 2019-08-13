import { Options } from "amqplib";
import Promise = require('bluebird');

export interface IEventBusConnector {
    Connect(options: Options.Connect): Promise<IEventBusPublisher>;
}

export class ExchangeEvent {
    Exchange!: string;
    Content!: Buffer;
    Routing!: string;
}

export interface IEventBusPublisher {
    Publish(event: ExchangeEvent) : boolean;
}