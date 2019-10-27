import { Options, Replies } from "amqplib";
import amq = require("amqplib");
import Promise = require('bluebird');

export class QueueExchangeDefinition
{
    Queue!: string;
    Exchange!: string;
    Durable!: boolean;
    AutoDelete!: boolean;
}

export interface IConsumerConnector {
    Connect(options: Options.Connect, definition: QueueExchangeDefinition): Promise<IConsumerHandler>;
}

export interface IConsumerHandler {
    Consume(callback: (msg: amq.ConsumeMessage) => void) : Promise<Replies.Consume>;
    Ack(msg: amq.ConsumeMessage): void;
    Nack(msg: amq.ConsumeMessage): void;
}

//-----------------------

export interface IPublisherConnector {
    Connect(options: Options.Connect, definition: QueueExchangeDefinition): Promise<IPublisherHandler>;
}

export class ExchangeEvent {
    Content!: Buffer;
    Routing!: string;
}

export interface IPublisherHandler {
    Publish(event: ExchangeEvent) : boolean;
}