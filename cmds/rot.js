const rot = require('rot');
const UserError = require("../src/UserError");
const BaseCommand = require("../src/BaseCommand");
module.exports = {
  hits: ['rot', 'rotate'],
  name: "Rotational Cypher",
  handler(content) {
    const cypher = parseInt(content.split(' ')[0]);
    if (Object.is(cypher, NaN)) throw new UserError("Missing rotational integer");
    let modulated = cypher % 26;
    if (modulated < 0) modulated += 26;
    const text = content.split(' ').splice(1).join(' ');
    return new BaseCommand(text, rot(text, modulated)).addField("Rotation", cypher);
  }
};
