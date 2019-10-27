"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var index_1 = require("../index");
var as_const_test_1 = require("./as.const.test");
describe("Local Connection", function () {
    it('publisher should connect local server', function (done) {
        var publisherConnector = index_1.CreatePublisherConnector();
        publisherConnector.Connect(as_const_test_1.OPTIONS, as_const_test_1.DEFINITION)
            .then(function (handler) {
            chai_1.expect(true).to.equal(true);
            done();
        })
            .catch(function (e) {
            chai_1.expect(false).to.equal(true);
            done();
        });
    });
    it("consumer should connect local server", function (done) {
        var consumerConnector = index_1.CreateConsumerConnector();
        consumerConnector.Connect(as_const_test_1.OPTIONS, as_const_test_1.DEFINITION)
            .then(function (handler) {
            chai_1.expect(true).to.equal(true);
            done();
        })
            .catch(function (e) {
            chai_1.expect(false).to.equal(true);
            done();
        });
    });
});
