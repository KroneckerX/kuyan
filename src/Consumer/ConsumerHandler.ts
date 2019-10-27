import amq = require("amqplib");
import { IConsumerHandler } from "../Model";
import { Channel, Replies } from "amqplib";
import Promise = require('bluebird');

export class ConsumerHandler implements IConsumerHandler {
    
    private readonly Queue: string;
    private readonly Channel: Channel;

    constructor(queue: string, channel: Channel){
        this.Queue = queue;
        this.Channel = channel;
    }

    Consume(callback: (msg: amq.ConsumeMessage) => void): Promise<Replies.Consume> {
        return new Promise<Replies.Consume>((resolve, reject) => {
            function _callback(_msg: amq.ConsumeMessage | null) : any {
                callback(_msg as amq.ConsumeMessage);
            }

            try {
                var prom = this.Channel.consume(this.Queue, _callback);
                prom
                    .then(x => resolve(x))
                    .catch(e => reject(e));
            } catch (e){
                reject(e);
            }
        });
    }    
    
    Ack(msg: amq.ConsumeMessage): void {
        this.Channel.ack(msg);
    }

    Nack(msg: amq.ConsumeMessage): void {
        this.Channel.nack(msg);
    }
}