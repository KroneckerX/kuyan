"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amq = require("amqplib");
var Promise = require("bluebird");
var EventBusValidator_1 = require("./EventBusHelpers/EventBusValidator");
var ConsumerHandler_1 = require("./ConsumerHandler");
var CONSISTENT_HASH_EXCHANGE_TYPE = "x-consistent-hash";
var eventBusValidator = new EventBusValidator_1.EventBusValidator();
var ConsumerConnector = /** @class */ (function () {
    function ConsumerConnector(exchanges) {
        eventBusValidator.Validate(exchanges);
        this.Exchanges = exchanges;
    }
    ConsumerConnector.prototype.Connect = function (options, index) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                amq.connect(options)
                    .then(function (conn) {
                    return conn.createChannel();
                })
                    .then(function (ch) {
                    _this.ConnectInternal(ch, index, resolve, reject);
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
    ConsumerConnector.prototype.ConnectInternal = function (ch, index, resolve, reject) {
        var _this = this;
        var promises = [];
        var queueName = "EventBusQueue_" + index;
        for (var _i = 0, _a = this.Exchanges; _i < _a.length; _i++) {
            var exchange = _a[_i];
            var promise = ch.assertExchange(exchange, CONSISTENT_HASH_EXCHANGE_TYPE, {
                durable: true,
                autoDelete: false
            });
            promises.push(promise);
        }
        Promise.all(promises)
            .then(function (x) {
            ch.assertQueue(queueName, {
                durable: true,
                autoDelete: false
            })
                .then(function (y) {
                var queueBindPromises = [];
                for (var _i = 0, _a = _this.Exchanges; _i < _a.length; _i++) {
                    var exchange = _a[_i];
                    var queueBindPromise = ch.bindQueue(queueName, exchange, '1');
                    queueBindPromises.push(queueBindPromise);
                }
                Promise.all(queueBindPromises)
                    .then(function (z) {
                    var consumerHandler = new ConsumerHandler_1.ConsumerHandler(queueName, ch);
                    resolve(consumerHandler);
                })
                    .catch(function (e) {
                    ch.close();
                    reject(e);
                });
            })
                .catch(function (e) {
                ch.close();
                reject(e);
            });
        })
            .catch(function (e) {
            ch.close();
            reject(e);
        });
    };
    return ConsumerConnector;
}());
exports.ConsumerConnector = ConsumerConnector;
