const wiz = require('atbash-wizard');
const BaseCommand = require('../src/BaseCommand');
module.exports = {
  hits: ['atbash', 'atb'],
  name: "Atbash",
  handler: (content) => {
    const params = {
      word: content,
      simon: true
    };
    let output;
    wiz.wizard(params, (err, data) => {
      if (err) throw err;
      else output = data;
    });
    return new BaseCommand(content, output);
  }
};
