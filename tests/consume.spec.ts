import { expect } from 'chai';
import 'mocha';
import { Options } from "amqplib";
import { CreatePublisherConnector, QueueExchangeDefinition, CreateConsumerConnector } from '../index';
import { CONTENT, DEFINITION, OPTIONS, ROUTE } from "./as.const.test";


describe("Consumer", () => {
    it("can consume message", (done) => {
        let consumerConnector = CreateConsumerConnector();
        consumerConnector.Connect(OPTIONS, DEFINITION)
            .then(handler => {
                handler.Consume(message => {
                    expect(message).to.not.equal(null);
                }).then(x => {
                    expect(x).to.not.equal(null);
                    done();
                })
            })
            .catch(e => {
                expect(false).to.equal(true);
                done();
            });
    });
});