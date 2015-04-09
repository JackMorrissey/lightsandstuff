var test = require('tap').test;
var whatColor = require('./whatColor');

var responseWithEntity = {
 "msg_id": "167bb991-f084-4649-b5ad-9f7dbead9af5",
 "_text": "what color is cornflower blue?",
 "outcomes": [
  {
   "_text": "what color is cornflower blue?",
   "intent": "what_color",
   "entities": {
    "color": [
     {
      "type": "value",
      "value": "cornflower blue",
      "suggested": true
     }
    ]
   },
   "confidence": 0.72
  }
 ]
};

var responseNoEntity = {
 "msg_id": "c060d4a4-7e78-4f38-8b17-335db99f5a21",
 "_text": "What is your favorite color?",
 "outcomes": [
  {
   "_text": "What is your favorite color?",
   "intent": "what_color",
   "entities": {},
   "confidence": 0.722
  }
 ]
};

test('identifies a request for a specific color', function(t){
    t.plan(2);
    var acted = whatColor(responseWithEntity.outcomes[0]);
    //console.log(acted);
    t.ok(acted.message.indexOf("Corn Flower Blue") >= 0, 'Replies with color name');
    t.equal(acted.color, "#6495ed");
});

test('identifies a request for a random color', function(t){
    t.plan(2);
    var acted = whatColor(responseNoEntity.outcomes[0]);
    t.ok(acted.message.length > 0, 'length is non-zero');
    t.equal(acted.color.length, 7, 'color looks like a hex');
});