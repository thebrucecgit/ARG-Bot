const version = require("../package.json").version;
module.exports = {
  hits: ['eval'],
  handler: (msg, content, client) => {
    if (msg.authorIsAdmin()) {
      try {
        let evaled = eval(content);
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
        msg.channel.send(clean(evaled), {code:"xl"});
      } catch (err) {
        msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    }
  }
};
const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
