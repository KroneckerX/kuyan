// import { EventBusConnector } from "./src/EventBusConnector";
// import { IEventBusConnector } from "./src/EventBus";
// import { IConsumerConnector } from "./src/Consumer";
// import { ConsumerConnector } from "./src/ConsumerConnector";

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


import { ConsumerConnector } from "./src/Consumer/ConsumerConnector";
import { IConsumerConnector, IPublisherConnector } from "./src/Model";
import { PublisherConnector } from "./src/Publisher/PublisherConnector";


export { IConsumerConnector, IConsumerHandler, IPublisherConnector, IPublisherHandler, QueueExchangeDefinition } from "./src/Model"

export function CreateConsumerConnector() : IConsumerConnector {
    var consumerConnector = new ConsumerConnector();
    return consumerConnector;
}

export function CreatePublisherConnector() : IPublisherConnector {
    var publisherConnector = new PublisherConnector();
    return publisherConnector;
}