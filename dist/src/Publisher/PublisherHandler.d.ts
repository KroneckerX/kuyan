import { IPublisherHandler, ExchangeEvent } from "../Model";
import { Channel } from "amqplib";
export declare class PublisherPublisher implements IPublisherHandler {
    private readonly Channel;
    private readonly Exchange;
    constructor(channel: Channel, exchange: string);
    Publish(event: ExchangeEvent): boolean;
}
