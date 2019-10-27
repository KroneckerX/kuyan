"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var index_1 = require("../index");
var as_const_test_1 = require("./as.const.test");
describe("Publisher", function () {
    it("can publish message", function (done) {
        var publisherConnector = index_1.CreatePublisherConnector();
        publisherConnector.Connect(as_const_test_1.OPTIONS, as_const_test_1.DEFINITION)
            .then(function (handler) {
            var published = handler.Publish({
                Content: Buffer.from(as_const_test_1.CONTENT),
                Routing: as_const_test_1.ROUTE
            });
            chai_1.expect(published).to.equal(true);
            done();
        })
            .catch(function (e) {
            chai_1.expect(false).to.equal(true);
            done();
        });
    });
});
