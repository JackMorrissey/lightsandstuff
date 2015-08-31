module.exports = tryRespond;

function tryRespond(outgoingVars, reply) {
    var incomingUrl = getIncomingUrl(outgoingVars.token);
    var shouldUseIncomingHook = !!reply.color; // we currently only use attachments for the fancy color display
    if (!incomingUrl || shouldUseIncomingHook) {
        return false;
    }
    var fullSlackResponse = {
        attachments: [
            {
                text: reply.message,
                fallback: reply.message,
                color: reply.color
            }
        ]
    };
    if (outgoingVars.channel_name) {
        fullSlackResponse.channel = '#' + outgoingVars.channel_name;
    }
    incomingHookResponse(incomingUrl, fullSlackResponse);
    return true;
}

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
