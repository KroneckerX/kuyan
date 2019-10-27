"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var index_1 = require("../index");
var as_const_test_1 = require("./as.const.test");
describe("Consume", function () {
    it("can consume message", function (done) {
        var consumerConnector = index_1.CreateConsumerConnector();
        consumerConnector.Connect(as_const_test_1.OPTIONS, as_const_test_1.DEFINITION)
            .then(function (handler) {
            handler.Consume(function (message) {
            }).then(function (x) {
                chai_1.expect(x).to.not.equal(null);
                done();
            });
        })
            .catch(function (e) {
            chai_1.expect(false).to.equal(true);
            done();
        });
    });
});
