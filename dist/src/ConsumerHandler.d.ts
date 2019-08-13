import amq = require("amqplib");
import { IConsumerHandler } from "./Consumer";
import { Channel } from "amqplib";
export declare class ConsumerHandler implements IConsumerHandler {
    private readonly Queue;
    private readonly Channel;
    constructor(queue: string, channel: Channel);
    Consume(callback: (msg: amq.ConsumeMessage) => void): void;
    Ack(msg: amq.ConsumeMessage): void;
    Nack(msg: amq.ConsumeMessage): void;
}
