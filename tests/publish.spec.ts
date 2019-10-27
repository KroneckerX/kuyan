import { expect } from 'chai';
import 'mocha';
import { Options } from "amqplib";
import { CreatePublisherConnector, QueueExchangeDefinition, CreateConsumerConnector } from '../index';
import { CONTENT, DEFINITION, OPTIONS, ROUTE } from "./as.const.test";

describe("Publisher", () => {
    it("can publish message", (done) => {
        let publisherConnector = CreatePublisherConnector();
        publisherConnector.Connect(OPTIONS, DEFINITION)
            .then(handler => {
                let published = handler.Publish({
                    Content: Buffer.from(CONTENT),
                    Routing: ROUTE
                });
                expect(published).to.equal(true);
                done();
            })
            .catch(e => {
                expect(false).to.equal(true);
                done();
            });
    });
});