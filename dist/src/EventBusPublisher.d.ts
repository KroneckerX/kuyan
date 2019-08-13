import { IEventBusPublisher, ExchangeEvent } from "./EventBus";
import { Channel } from "amqplib";
export declare class EventBusPublisher implements IEventBusPublisher {
    private readonly Exchanges;
    private readonly Channel;
    constructor(exchanges: Array<string>, channel: Channel);
    Publish(event: ExchangeEvent): boolean;
}
