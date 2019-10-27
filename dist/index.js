"use strict";
// import { EventBusConnector } from "./src/EventBusConnector";
// import { IEventBusConnector } from "./src/EventBus";
// import { IConsumerConnector } from "./src/Consumer";
// import { ConsumerConnector } from "./src/ConsumerConnector";
Object.defineProperty(exports, "__esModule", { value: true });
// export function createEventBusConnector(exchanges: Array<string>) : IEventBusConnector {
//     var eventBusConnector = new EventBusConnector(exchanges);
//     return eventBusConnector;
// }
// export { IEventBusConnector, IEventBusPublisher, ExchangeEvent } from "./src/EventBus"
// export function createConsumerConnector(exchanges: Array<string>) :  IConsumerConnector {
//     var consumerConnector = new ConsumerConnector(exchanges);
//     return consumerConnector;
// }
// export { IConsumerConnector, IConsumerHandler } from "./src/Consumer"
// export { eventBusGroup } from "./src/EventBusGroup";
var ConsumerConnector_1 = require("./src/Consumer/ConsumerConnector");
var PublisherConnector_1 = require("./src/Publisher/PublisherConnector");
var Model_1 = require("./src/Model");
exports.QueueExchangeDefinition = Model_1.QueueExchangeDefinition;
function CreateConsumerConnector() {
    var consumerConnector = new ConsumerConnector_1.ConsumerConnector();
    return consumerConnector;
}
exports.CreateConsumerConnector = CreateConsumerConnector;
function CreatePublisherConnector() {
    var publisherConnector = new PublisherConnector_1.PublisherConnector();
    return publisherConnector;
}
exports.CreatePublisherConnector = CreatePublisherConnector;
