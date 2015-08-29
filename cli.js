var args = process.argv.splice(2);
var sentence = args.join(' ');
require('./main').interpret(sentence)
.then(console.log)
.catch(function(err) {
    console.error(err);
});
