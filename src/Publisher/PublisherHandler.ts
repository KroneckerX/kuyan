import { IPublisherHandler, ExchangeEvent } from "../Model";
import { Channel } from "amqplib";


export class PublisherPublisher implements IPublisherHandler {

    private readonly Channel: Channel;
    private readonly Exchange: string;

    constructor(channel: Channel, exchange: string){
        this.Channel = channel;
        this.Exchange = exchange;
    }

    Publish(event: ExchangeEvent): boolean {

        let routing = event.Routing;
        let content = event.Content;

        return this.Channel.publish(this.Exchange, routing, content);
    }
}