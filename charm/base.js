var format = require('util').format;
module.exports = getRandom;

function getRandom(arrayOfChoices, input1){
    var choice = arrayOfChoices[Math.floor(Math.random()*arrayOfChoices.length)];
    return format(choice, input1);
}