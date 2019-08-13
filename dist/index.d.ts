import { IEventBusConnector } from "./src/EventBus";
import { IConsumerConnector } from "./src/Consumer";
export declare function createEventBusConnector(exchanges: Array<string>): IEventBusConnector;
export { IEventBusConnector, IEventBusPublisher, ExchangeEvent } from "./src/EventBus";
export declare function createConsumerConnector(exchanges: Array<string>): IConsumerConnector;
export { IConsumerConnector, IConsumerHandler } from "./src/Consumer";
export { eventBusGroup } from "./src/EventBusGroup";
