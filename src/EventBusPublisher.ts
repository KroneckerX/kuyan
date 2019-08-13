import { IEventBusPublisher, ExchangeEvent } from "./EventBus";
import { Channel } from "amqplib";

export class EventBusPublisher implements IEventBusPublisher {

    private readonly Exchanges: Array<string>;
    private readonly Channel: Channel;

    constructor(exchanges: Array<string>, channel: Channel){
        this.Exchanges = exchanges;
        this.Channel = channel;
    }

    Publish(event: ExchangeEvent): boolean {

        let exchange = event.Exchange;
        let hashIndex  = this.Exchanges.indexOf(exchange)
        if (hashIndex == -1) {
            throw new Error(`The exchange '${exchange}' is not defined in any exchange group.`);
        }
        let routing = event.Routing;
        let content = event.Content;

        return this.Channel.publish(exchange, routing, content);
    }
}