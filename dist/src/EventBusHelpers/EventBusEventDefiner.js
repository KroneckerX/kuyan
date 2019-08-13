"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Seed = 1;
var EventBusEventDefiner = /** @class */ (function () {
    function EventBusEventDefiner() {
    }
    EventBusEventDefiner.prototype.Define = function (exchanges) {
        var definition = {};
        for (var i = 0; i < exchanges.length; i++) {
            var currentSeed = Seed++;
            var exchangeGroup = exchanges[i];
            for (var j = 0; j < exchangeGroup.length; j++) {
                var exchangeName = exchangeGroup[j];
                definition[exchangeName] = currentSeed;
            }
        }
        return definition;
    };
    return EventBusEventDefiner;
}());
exports.EventBusEventDefiner = EventBusEventDefiner;
