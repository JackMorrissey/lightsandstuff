module.exports = function(request, response) {
    var main = require('../main.js');
    main.interpret(request.body.text).then(respond);

    function respond(reply) {
        if (!require('./incomingHook.js')(request.body, reply)) {
            response.send({
                text: reply.message
            });
        }
    }
};
