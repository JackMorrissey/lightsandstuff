var format = require('util').format;
module.exports = getRandom;

function getRandom(arrayOfChoices, formatInput) {
    var choice = arrayOfChoices[Math.floor(Math.random() * arrayOfChoices.length)];
    if (!formatInput) {
        return choice;
    }
    return format(choice, formatInput);
}
