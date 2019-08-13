import amq = require("amqplib");
import { IConsumerHandler } from "./Consumer";
import { Channel } from "amqplib";

export class ConsumerHandler implements IConsumerHandler {
    
    private readonly Queue: string;
    private readonly Channel: Channel;

    constructor(queue: string, channel: Channel){
        this.Queue = queue;
        this.Channel = channel;
    }

    Consume(callback: (msg: amq.ConsumeMessage) => void): void {
        function _callback(_msg: amq.ConsumeMessage | null) : any {
            callback(_msg as amq.ConsumeMessage);
        }

        this.Channel.consume(this.Queue, _callback);
    }    
    
    Ack(msg: amq.ConsumeMessage): void {
        this.Channel.ack(msg);
    }

    Nack(msg: amq.ConsumeMessage): void {
        this.Channel.nack(msg);
    }
}