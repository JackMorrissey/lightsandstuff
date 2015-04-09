module.exports = function(input, confidence){
    //TODO: different messages based on confidence
    return require('./base')([
        "Here you go. %s.",
        "That's the ticket. %s",
        "Coming right up. %s.",
        "%s. Satisfaction guaranteed.",
        "Behold! %s.",
        "To your request I reply \"%s.\"",
        "Oh. %s",
        "%s. Shazam!",
        "Awwwwwwwww yeah! %s!",
        "You got it pal. %s."
    ], input);
};