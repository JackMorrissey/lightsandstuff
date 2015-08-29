var freeResponse = require('../charm/freeResponse');
var requestedResponse = require('../charm/requestedResponse');
var color = require('../color');

module.exports = act;

function act (outcome) {
    if (!outcome || !outcome.entities || !outcome.entities.color) {
        var randomColor = color.random();
        return {
            message: getMessage(randomColor),
            color: randomColor.hex
        };
    }
    var foundColor = color.find(outcome.entities.color[0].value);
    if (!foundColor) {
        return undefined;
    }
    return {
        message: getMessage(foundColor.name, outcome.confidence),
        color: foundColor.hex
    };
}

function getMessage(pickedColor, confidence) {
    return pickedColor.hex + ' ' + requestedResponse(pickedColor.name, confidence);
}
