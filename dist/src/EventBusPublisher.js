"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventBusPublisher = /** @class */ (function () {
    function EventBusPublisher(exchanges, channel) {
        this.Exchanges = exchanges;
        this.Channel = channel;
    }
    EventBusPublisher.prototype.Publish = function (event) {
        var exchange = event.Exchange;
        var hashIndex = this.Exchanges.indexOf(exchange);
        if (hashIndex == -1) {
            throw new Error("The exchange '" + exchange + "' is not defined in any exchange group.");
        }
        var routing = event.Routing;
        var content = event.Content;
        return this.Channel.publish(exchange, routing, content);
    };
    return EventBusPublisher;
}());
exports.EventBusPublisher = EventBusPublisher;
