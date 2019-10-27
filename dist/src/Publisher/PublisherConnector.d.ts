import Promise = require('bluebird');
import { Options } from "amqplib";
import { IPublisherConnector, IPublisherHandler, QueueExchangeDefinition } from "../Model";
export declare class PublisherConnector implements IPublisherConnector {
    Connect(options: Options.Connect, definition: QueueExchangeDefinition): Promise<IPublisherHandler>;
}
