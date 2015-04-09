module.exports = function(input){
    return require('./base')([
        "Hmm. I'm feeling %s.",
        "How about %s?",
        "Ya know, I've been thinking an awful lot about %s.",
        "All signs point to %s.",
        "I absolutely adore %s.",
        "Most def %s.",
        "Perhaps you'd be interested in %s?",
        "Thanks for asking! %s!",
        "I've been waiting for this moment! %s!",
        "Oh, for sure %s."
    ], input);
};