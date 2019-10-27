import Promise = require('bluebird');
import { Options } from "amqplib";
import amq = require("amqplib");
import { IPublisherConnector, IPublisherHandler, QueueExchangeDefinition } from "../Model";
import { PublisherPublisher } from "./PublisherHandler";
import { CONSISTENT_HASH_EXCHANGE_TYPE } from "../Consts";

export class PublisherConnector implements IPublisherConnector {
    Connect(options: Options.Connect, definition: QueueExchangeDefinition): Promise<IPublisherHandler> {
        return new Promise<IPublisherHandler>((resolve, reject) => {
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
                                                let publisherHandler = new PublisherPublisher(channel, definition.Exchange);
                                                resolve(publisherHandler);
                                            })
                                            .catch(e => channel.close().then(_ => reject(e)).catch(e2 => reject(e2)));
                                    })
                                    .catch(e => channel.close().then(_ => reject(e)).catch(e2 => reject(e2)));
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