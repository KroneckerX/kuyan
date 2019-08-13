"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventBusConnector_1 = require("./src/EventBusConnector");
var ConsumerConnector_1 = require("./src/ConsumerConnector");
function createEventBusConnector(exchanges) {
    var eventBusConnector = new EventBusConnector_1.EventBusConnector(exchanges);
    return eventBusConnector;
}
exports.createEventBusConnector = createEventBusConnector;
var EventBus_1 = require("./src/EventBus");
exports.ExchangeEvent = EventBus_1.ExchangeEvent;
function createConsumerConnector(exchanges) {
    var consumerConnector = new ConsumerConnector_1.ConsumerConnector(exchanges);
    return consumerConnector;
}
exports.createConsumerConnector = createConsumerConnector;
var EventBusGroup_1 = require("./src/EventBusGroup");
exports.eventBusGroup = EventBusGroup_1.eventBusGroup;
