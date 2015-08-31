module.exports = tryRespond;

function tryRespond(incomingVars, reply) {
    var incomingUrl = getIncomingUrl(incomingVars.token);
    if (!incomingUrl) {
        return false;
    }
    var fullSlackResponse = {
        attachments: [
            {
                text: reply.message,
                fallback: reply.message
            }
        ]
    };
    if (incomingVars.channel) {
        fullSlackResponse.channel = '#' + incomingVars.channel;
    }
    if (reply.color) {
        fullSlackResponse.attachments[0].color = reply.color;
    }
    incomingHookResponse(incomingUrl, fullSlackResponse);
    return true;
};

function getIncomingUrl(token) {
    var configuration = require('../configuration');
    try {
        return configuration('slack-' + token);
    } catch(e) {
        return undefined;
    }
}

function incomingHookResponse(incomingUrl, slackResponse) {
    var request = require('request');
    var options = {
        url: incomingUrl,
        formData: {
            payload: JSON.stringify(slackResponse)
        }
    };
    request.post(options, function (error, response) {
        if (error || response.statusCode !== 200) {
            console.error(error);
        }
    });
}
