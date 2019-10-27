"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var amq = require("amqplib");
var PublisherHandler_1 = require("./PublisherHandler");
var Consts_1 = require("../Consts");
var PublisherConnector = /** @class */ (function () {
    function PublisherConnector() {
    }
    PublisherConnector.prototype.Connect = function (options, definition) {
        return new Promise(function (resolve, reject) {
            try {
                amq.connect(options)
                    .then(function (connection) { return connection.createChannel(); })
                    .then(function (channel) {
                    channel.assertExchange(definition.Exchange, Consts_1.CONSISTENT_HASH_EXCHANGE_TYPE, {
                        durable: definition.Durable,
                        autoDelete: definition.AutoDelete
                    })
                        .then(function (_) {
                        channel.assertQueue(definition.Queue, {
                            durable: definition.Durable,
                            autoDelete: definition.AutoDelete
                        })
                            .then(function (_) {
                            channel.bindQueue(definition.Queue, definition.Exchange, '1')
                                .then(function (_) {
                                var publisherHandler = new PublisherHandler_1.PublisherPublisher(channel, definition.Exchange);
                                resolve(publisherHandler);
                            })
                                .catch(function (e) { return channel.close().then(function (_) { return reject(e); }).catch(function (e2) { return reject(e2); }); });
                        })
                            .catch(function (e) { return channel.close().then(function (_) { return reject(e); }).catch(function (e2) { return reject(e2); }); });
                    })
                        .catch(function (e) { return channel.close().then(function (_) { return reject(e); }).catch(function (e2) { return reject(e2); }); });
                })
                    .catch(function (e) { return reject(e); });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    return PublisherConnector;
}());
exports.PublisherConnector = PublisherConnector;
