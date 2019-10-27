"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var index_1 = require("../index");
describe("Local Connection", function () {
    var OPTIONS = {
        hostname: "localhost",
        username: "senja",
        password: "1qaz!QAZ"
    };
    var DEFINITION = {
        Queue: "local_test",
        Exchange: "local_exchange"
    };
    it('publisher should connect local server', function () {
        var publisherConnector = index_1.CreatePublisherConnector();
        publisherConnector.Connect(OPTIONS, DEFINITION)
            .then(function (handler) {
            chai_1.expect(true).to.equal(true);
        })
            .catch(function (e) {
            chai_1.expect(e).to.equal(true);
        });
    });
    it("consumer should connect local server", function () {
        var consumerConnector = index_1.CreateConsumerConnector();
        consumerConnector.Connect(OPTIONS, DEFINITION)
            .then(function (handler) {
            chai_1.expect(true).to.equal(true);
        })
            .catch(function (e) {
            chai_1.expect(e).to.equal(true);
        });
    });
});
