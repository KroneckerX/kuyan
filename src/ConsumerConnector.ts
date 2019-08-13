import amq = require("amqplib");
import Promise = require("bluebird");
import { Options, Replies } from "amqplib";
import { IConsumerConnector, IConsumerHandler } from "./Consumer";
import { EventBusValidator } from "./EventBusHelpers/EventBusValidator";
import { ConsumerHandler } from "./ConsumerHandler";

const CONSISTENT_HASH_EXCHANGE_TYPE = "x-consistent-hash";


const eventBusValidator = new EventBusValidator();


interface ExchangeGroup {
    [idExchange: string] : Array<string>
}


export class ConsumerConnector implements IConsumerConnector {

    private readonly Exchanges: Array<string>;

    constructor(exchanges: Array<string>){
        eventBusValidator.Validate(exchanges);
        this.Exchanges = exchanges;
    }

    Connect(options: Options.Connect, index: number): Promise<IConsumerHandler> {
        return new Promise<IConsumerHandler>((resolve, reject) => {
            try {
                amq.connect(options)
                    .then(conn => {
                        return conn.createChannel();
                    })
                    .then(ch => {
                        this.ConnectInternal(ch, index, resolve, reject);
                    })
                    .catch(e => {
                        reject(e);
                    })
            } catch (e) {
                reject(e);
            }
        });
    }

    private ConnectInternal(ch: amq.Channel, index: number,
        resolve : (_x: IConsumerHandler | PromiseLike<IConsumerHandler> | undefined) =>  void,
        reject : (_x?: any) => any
        ) {

        let promises = [];
        let queueName = `EventBusQueue_${index}`; 
        
        for (let exchange of this.Exchanges) {

            let promise = ch.assertExchange(exchange, CONSISTENT_HASH_EXCHANGE_TYPE, {
                durable: true,
                autoDelete: false
            });
            promises.push(promise);
        }

        Promise.all(promises)
            .then(x => {

                ch.assertQueue(queueName, {
                    durable: true,
                    autoDelete: false
                })
                    .then(y => {
                        let queueBindPromises = [];
                        
                        for (let exchange of this.Exchanges) {
                            let queueBindPromise = ch.bindQueue(queueName,  exchange, '1');
                            queueBindPromises.push(queueBindPromise);
                        }
                        
                        Promise.all(queueBindPromises)
                            .then(z => {
                                let consumerHandler = new ConsumerHandler(queueName, ch);
                                resolve(consumerHandler);
                            })
                            .catch(e => {
                                ch.close();
                                reject(e);
                            });
                    })
                    .catch(e => {
                        ch.close();
                        reject(e);
                    });
            })
            .catch(e => {
                ch.close();
                reject(e);
            });
    }
}