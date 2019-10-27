import amq = require("amqplib");
import Promise = require("bluebird");
import { Options, Replies } from "amqplib";
import { IConsumerHandler, IConsumerConnector, QueueExchangeDefinition } from "../Model";
import { ConsumerHandler } from "./ConsumerHandler";
import { CONSISTENT_HASH_EXCHANGE_TYPE } from "../Consts";



export class ConsumerConnector implements IConsumerConnector {
    Connect(options: Options.Connect, definition: QueueExchangeDefinition): Promise<IConsumerHandler> {
        return new Promise<IConsumerHandler>((resolve, reject) => {
            try {
                amq.connect(options)
                    .then(connection => connection.createChannel())
                    .then(channel => {
                        channel.assertExchange(definition.Exchange, CONSISTENT_HASH_EXCHANGE_TYPE,
                            {
                                durable: definition.Durable,
                                autoDelete: definition.AutoDelete
                            })
                            .then(_ => {
                                channel.assertQueue(definition.Queue, 
                                    {
                                        durable: definition.Durable,
                                        autoDelete: definition.AutoDelete
                                    })
                                    .then(_ => {
                                        channel.bindQueue(definition.Queue, definition.Exchange, '1')
                                        .then(_ => {
                                            var subscriberHandler = new ConsumerHandler(definition.Queue, channel);
                                            resolve(subscriberHandler);
                                        })
                                        .catch(e => channel.close().then(_ => reject(e)).catch(e2 => reject(e2)));
                                    })
                                    .catch(e => channel.close().then(_ => reject(e)).catch(e2 => reject(e2)))
                            })
                            .catch(e => channel.close().then(_ => reject(e)).catch(e2 => reject(e2)));
                    })
                    .catch(e => reject(e));
            } catch (e) {
                reject(e);
            }
        });
    }
}