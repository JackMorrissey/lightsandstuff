var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var main = require('./main');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true
}));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.post('/api', function(request, response){
    main.interpret(request.body.text).then(function(reply){
        response.send({
            "text": reply.message
        });
    });
    
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
