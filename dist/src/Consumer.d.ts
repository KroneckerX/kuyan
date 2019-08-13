import { Options } from "amqplib";
import amq = require("amqplib");
import Promise = require('bluebird');
export interface IConsumerConnector {
    Connect(options: Options.Connect, index: number): Promise<IConsumerHandler>;
}
export interface IConsumerHandler {
    Consume(callback: (msg: amq.ConsumeMessage) => void): void;
    Ack(msg: amq.ConsumeMessage): void;
    Nack(msg: amq.ConsumeMessage): void;
}
