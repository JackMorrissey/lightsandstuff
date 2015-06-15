var wit = require('./witai/wit');

exports.interpret = interpret;

function interpret(sentence){
    return wit.getIntent(sentence).then(parseIntent);
}

function parseIntent(intent){
    var outcomes = intent.outcomes; //array of objects
    if(!outcomes || outcomes.length === 0){
        return noOutcomes();
    }
    var outcome = outcomes[0];
    switch(outcome.intent){
        case "what_color":
            return require("./intents/whatColor")(outcome);
        default: 
            return noOutcomes();
    }

}

function noOutcomes(){
    return {
        message: require('./charm/confused')()
    };
}