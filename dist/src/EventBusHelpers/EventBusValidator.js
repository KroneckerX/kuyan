"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventBusValidator = /** @class */ (function () {
    function EventBusValidator() {
    }
    EventBusValidator.prototype.Validate = function (exchanges) {
        if (exchanges == null || !exchanges.length) {
            throw new Error("'exchange' should be different than 'null' or 'empty'.");
        }
        for (var i = 0; i < exchanges.length; i++) {
            var indexEchange = exchanges[i];
            for (var j = i + 1; j < exchanges.length; j++) {
                var currentExchange = exchanges[j];
                if (indexEchange == currentExchange) {
                    throw new Error("Invalid exchange definition. No intersection allowed in the definition. The following values were defined multiple times: " + currentExchange);
                }
            }
        }
    };
    return EventBusValidator;
}());
exports.EventBusValidator = EventBusValidator;
