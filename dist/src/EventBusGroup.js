"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
function eventBusGroup(eventBusConnector, consumerConnector, options, index) {
    return new Promise(function (resolve, reject) {
        Promise.all([eventBusConnector.Connect(options), consumerConnector.Connect(options, index)])
            .then(function (_a) {
            var eventBusPublisher = _a[0], consumerHandler = _a[1];
            resolve([eventBusPublisher, consumerHandler]);
        })
            .catch(function (e) {
            reject(e);
        });
    });
    throw new Error();
}
exports.eventBusGroup = eventBusGroup;
