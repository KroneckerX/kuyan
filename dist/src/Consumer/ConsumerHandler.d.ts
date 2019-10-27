import amq = require("amqplib");
import { IConsumerHandler } from "../Model";
import { Channel, Replies } from "amqplib";
import Promise = require('bluebird');
export declare class ConsumerHandler implements IConsumerHandler {
    private readonly Queue;
    private readonly Channel;
    constructor(queue: string, channel: Channel);
    Consume(callback: (msg: amq.ConsumeMessage) => void): Promise<Replies.Consume>;
    Ack(msg: amq.ConsumeMessage): void;
    Nack(msg: amq.ConsumeMessage): void;
}
