module.exports = getConfiguration;

function getConfiguration(key){
    var secrets;
    try {
        secrets = require('./secrets');
    } catch(e){
        throw new Error('Unable to load the configuration. You need to add a secrets file');
    }
    return secrets[key];
}