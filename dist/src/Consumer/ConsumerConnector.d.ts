import Promise = require("bluebird");
import { Options } from "amqplib";
import { IConsumerHandler, IConsumerConnector, QueueExchangeDefinition } from "../Model";
export declare class ConsumerConnector implements IConsumerConnector {
    Connect(options: Options.Connect, definition: QueueExchangeDefinition): Promise<IConsumerHandler>;
}
