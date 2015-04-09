var cssColors =  require('./css.json');
var crayolaColors = require('./crayola.json');

module.exports = {
    find: find,
    random: random
};

function find(colorText){
    var stripped = colorText.toLowerCase().replace(/[^0-9a-z]/g, "");
    return cssColors[stripped] || crayolaColors[stripped];
}

function random(){
    var keys = Object.keys(crayolaColors);
    return crayolaColors[keys[ keys.length * Math.random() << 0]];
}