import Promise = require("bluebird");
import { Options } from "amqplib";
import { IConsumerConnector, IConsumerHandler } from "./Consumer";
export declare class ConsumerConnector implements IConsumerConnector {
    private readonly Exchanges;
    constructor(exchanges: Array<string>);
    Connect(options: Options.Connect, index: number): Promise<IConsumerHandler>;
    private ConnectInternal;
}
