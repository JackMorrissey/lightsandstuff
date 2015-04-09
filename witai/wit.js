var q = require('q');
var wit = require('node-wit');
var configuration = require('../configuration');
var ACCESS_TOKEN = configuration('witAiToken');

exports.getIntent = getIntent;

function getIntent(textInput){
    var deferred = q.defer();
    wit.captureTextIntent(ACCESS_TOKEN, textInput, function (err, res) {
        if (err){
            deferred.reject(err);
        }
        deferred.resolve(res);
    });
    return deferred.promise;
}