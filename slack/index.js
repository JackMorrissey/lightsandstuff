module.exports = function(request, response) {
    var main = require('../main.js');
    main.interpret(request.body.text).then(function(reply) {
        response.send({
            'text': reply.message
        });
    });
};
