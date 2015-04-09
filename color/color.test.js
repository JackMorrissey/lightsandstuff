test = require('tap').test;
color = require('./index');

test('css colors are found', function(t){
    t.plan(2);
    t.equal(color.find("green").name, "Green");
    t.equal(color.find("green").hex, "#008000");
    t.end();
});

test('crayola colors are found', function(t){
    t.plan(2);
    var toFindName = "Purple Mountain's Majesty";
    t.equal(color.find(toFindName).name, toFindName);
    t.equal(color.find(toFindName).hex, "#9D81BA");
    t.end();
});

test('can find colors loosly', function(t){
    t.plan(3);
    var hex = "#9D81BA";
    t.equal(color.find("purple mountains majesty").hex, hex);
    t.equal(color.find("purple mountainsmajesty").hex, hex);
    t.equal(color.find("puRPle Mountain'S maJE'sty?").hex, hex);
    t.end();
});

test('can get a random color', function(t){
    t.plan(2);
    var randomColor = color.random();
    //console.log(randomColor);
    t.ok(randomColor.hex.indexOf('#') === 0, 'Looks like a hex');
    t.ok(randomColor.hex.length === 7, 'Has proper hex length');
});