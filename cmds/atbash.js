const wiz = require('atbash-wizard');
module.exports = {
  hits: ['atbash', 'atb'],
  handler: (msg, content) => {
    const res = {};
    res.commandName = "Atbash-ing";
    res.input = content;
    var params = {
        word: content,
        simon: true
    };
    wiz.wizard(params, function(err, data){
        if (err) {
            console.log(err);
        } else {
            res.output = data.replace('@', '!');
        }
    });
    return res;
  }
};
