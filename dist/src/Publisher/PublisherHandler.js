"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PublisherPublisher = /** @class */ (function () {
    function PublisherPublisher(channel, exchange) {
        this.Channel = channel;
        this.Exchange = exchange;
    }
    PublisherPublisher.prototype.Publish = function (event) {
        var routing = event.Routing;
        var content = event.Content;
        return this.Channel.publish(this.Exchange, routing, content);
    };
    return PublisherPublisher;
}());
exports.PublisherPublisher = PublisherPublisher;
