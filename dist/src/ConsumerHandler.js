"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConsumerHandler = /** @class */ (function () {
    function ConsumerHandler(queue, channel) {
        this.Queue = queue;
        this.Channel = channel;
    }
    ConsumerHandler.prototype.Consume = function (callback) {
        function _callback(_msg) {
            callback(_msg);
        }
        this.Channel.consume(this.Queue, _callback);
    };
    ConsumerHandler.prototype.Ack = function (msg) {
        this.Channel.ack(msg);
    };
    ConsumerHandler.prototype.Nack = function (msg) {
        this.Channel.nack(msg);
    };
    return ConsumerHandler;
}());
exports.ConsumerHandler = ConsumerHandler;
