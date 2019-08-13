export class EventBusValidator {
    Validate(exchanges: Array<string>) {
        if (exchanges == null || !exchanges.length) {
            throw new Error("'exchange' should be different than 'null' or 'empty'.")
        }

        for (let i = 0; i < exchanges.length; i++) {
            let indexEchange = exchanges[i];
            for (let j = i + 1; j < exchanges.length; j++) {
                let currentExchange = exchanges[j];
                
                if (indexEchange == currentExchange){
                    throw new Error(`Invalid exchange definition. No intersection allowed in the definition. The following values were defined multiple times: ${currentExchange}`);
                }
            }
        }
    }
}