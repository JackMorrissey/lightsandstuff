var freeResponse = require('../charm/freeResponse');
var requestedResponse = require('../charm/requestedResponse');
var color = require('../color');

module.exports = act;

function act (outcome){
    if(!outcome || !outcome.entities || !outcome.entities.color ){
        var randomColor = color.random();
        return {
            message: freeResponse(randomColor.name),
            color: randomColor.hex
        };
    }
    var foundColor = color.find(outcome.entities.color[0].value);
    return {
        message: requestedResponse(foundColor.name, outcome.confidence),
        color: foundColor.hex
    };
}