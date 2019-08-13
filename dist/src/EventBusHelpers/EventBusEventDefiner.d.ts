export interface EventDefinition {
    [name: string]: number;
}
export declare class EventBusEventDefiner {
    Define(exchanges: Array<Array<string>>): EventDefinition;
}
