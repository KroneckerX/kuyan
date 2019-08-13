import { IEventBusConnector, IEventBusPublisher } from "./EventBus";
import { EventBusPublisher } from "./EventBusPublisher";
import { EventBusValidator } from "./EventBusHelpers/EventBusValidator";
import Promise = require('bluebird');
import { Options } from "amqplib";
import amq = require("amqplib");

const CONSISTENT_HASH_EXCHANGE_TYPE = "x-consistent-hash";

const eventBusValidator = new EventBusValidator();

export class EventBusConnector implements IEventBusConnector {

    private readonly Exchanges:  Array<string>;

    constructor(exchanges: Array<string>){
        eventBusValidator.Validate(exchanges);
        this.Exchanges = exchanges;
    }

    Connect(options: Options.Connect): Promise<IEventBusPublisher> {
        return new Promise<IEventBusPublisher>((resolve, reject) => {
            try {
                amq.connect(options)
                    .then(conn => {
                        return conn.createChannel();
                    })
                    .then(ch => {
                        var promises = [];
                        for (let exchange of this.Exchanges) {
                            var currentPromise = ch.assertExchange(exchange, CONSISTENT_HASH_EXCHANGE_TYPE, {
                                durable: true,
                                autoDelete: false
                            }); 
                            promises.push(currentPromise);
                        }
                        Promise.all(promises).then(x => {
                            var publisher = new EventBusPublisher(this.Exchanges, ch);
                            resolve(publisher);
                        }).catch(e => {
                            ch.close()
                                .then(_ => {
                                    reject(e);
                                })
                                .catch(e2 => {
                                    reject(e2);
                                });
                        }); 
                    })
                    .catch(e => {
                        reject(e);
                    });
            } catch(e) {
                reject(e);
            }
        });
    }  
}