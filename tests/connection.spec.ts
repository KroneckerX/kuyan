import { expect } from 'chai';
import 'mocha';
import { CreatePublisherConnector, CreateConsumerConnector } from '../index';
import { DEFINITION, OPTIONS } from "./as.const.test";

describe("Publisher's local Connection", () => {
    it('should connect to local server', (done) => {
        let publisherConnector = CreatePublisherConnector();
        publisherConnector.Connect(OPTIONS, DEFINITION)
        .then(handler => {
            expect(true).to.equal(true);
            done();
        })
        .catch(e =>{
            expect(false).to.equal(true);
            done();
        });
    });

    it("shouldn't connect to local server with wrong creds", (done) => {
        let publisherConnector = CreatePublisherConnector();
        let options = JSON.parse(JSON.stringify(OPTIONS));
        options.password = "WRONG_PASS";
        publisherConnector.Connect(options, DEFINITION)
        .then(handler => {
            expect(false).to.equal(true);
            done();
        })
        .catch(e =>{
            expect(true).to.equal(true);
            done();
        });
    });
})


describe("Consumer's local connection", () => {
    it("should connect to local server", (done) => {
        let consumerConnector = CreateConsumerConnector();
        consumerConnector.Connect(OPTIONS, DEFINITION)
        .then(handler => {
            expect(true).to.equal(true);
            done();
        })
        .catch(e => {
            expect(false).to.equal(true);
            done();
        });
    });

    it("shouldn't connect to local server with wrong creds", (done) => {
        let consumerConnector = CreateConsumerConnector();
        consumerConnector.Connect(OPTIONS, DEFINITION)
        let options = JSON.parse(JSON.stringify(OPTIONS));
        options.password = "WRONG_PASS";
        consumerConnector.Connect(options, DEFINITION)
        .then(handler => {
            expect(false).to.equal(true);
            done();
        })
        .catch(e =>{
            expect(true).to.equal(true);
            done();
        });
    });
});