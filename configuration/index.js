module.exports = getConfiguration;

function getConfiguration(key) {
    // try to find it in the environment variables first
    // this is great for Heroku
    var envVariable = process.env[key];
    if (envVariable) {
        return envVariable;
    }

    var secrets;
    try {
        secrets = require('./secrets');
    } catch(e) {
        throw new Error('Unable to load the configuration. You need to add an env variable or a secrets file');
    }
    if (!secrets[key]) {
        throw new Error('Unable to find "' + key + '" in the secrets file or env variables');
    }
    return secrets[key];
}
