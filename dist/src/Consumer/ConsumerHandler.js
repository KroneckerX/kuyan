"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var ConsumerHandler = /** @class */ (function () {
    function ConsumerHandler(queue, channel) {
        this.Queue = queue;
        this.Channel = channel;
    }
    ConsumerHandler.prototype.Consume = function (callback) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            function _callback(_msg) {
                callback(_msg);
            }
            try {
                var prom = _this.Channel.consume(_this.Queue, _callback);
                prom
                    .then(function (x) { return resolve(x); })
                    .catch(function (e) { return reject(e); });
            }
            catch (e) {
                reject(e);
            }
        });
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
