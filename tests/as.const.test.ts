import { Options } from "amqplib";
import { QueueExchangeDefinition } from '../index';

export const OPTIONS = {
    hostname: "localhost",
    username: "senja",
    password: "1qaz!QAZ"
} as Options.Connect;

export const DEFINITION = {
    Queue: "local_test",
    Exchange: "local_exchange"
} as QueueExchangeDefinition;


export const CONTENT = "CONTENT";
export const ROUTE = "ROUTE";