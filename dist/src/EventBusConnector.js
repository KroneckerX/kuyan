"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventBusPublisher_1 = require("./EventBusPublisher");
var EventBusValidator_1 = require("./EventBusHelpers/EventBusValidator");
var Promise = require("bluebird");
var amq = require("amqplib");
var CONSISTENT_HASH_EXCHANGE_TYPE = "x-consistent-hash";
var eventBusValidator = new EventBusValidator_1.EventBusValidator();
var EventBusConnector = /** @class */ (function () {
    function EventBusConnector(exchanges) {
        eventBusValidator.Validate(exchanges);
        this.Exchanges = exchanges;
    }
    EventBusConnector.prototype.Connect = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                amq.connect(options)
                    .then(function (conn) {
                    return conn.createChannel();
                })
                    .then(function (ch) {
                    var promises = [];
                    for (var _i = 0, _a = _this.Exchanges; _i < _a.length; _i++) {
                        var exchange = _a[_i];
                        var currentPromise = ch.assertExchange(exchange, CONSISTENT_HASH_EXCHANGE_TYPE, {
                            durable: true,
                            autoDelete: false
                        });
                        promises.push(currentPromise);
                    }
                    Promise.all(promises).then(function (x) {
                        var publisher = new EventBusPublisher_1.EventBusPublisher(_this.Exchanges, ch);
                        resolve(publisher);
                    }).catch(function (e) {
                        ch.close()
                            .then(function (_) {
                            reject(e);
                        })
                            .catch(function (e2) {
                            reject(e2);
                        });
                    });
                })
                    .catch(function (e) {
                    reject(e);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    return EventBusConnector;
}());
exports.EventBusConnector = EventBusConnector;
