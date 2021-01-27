const child = require('child_process');
module.exports = {
  hits: ['restart'],
  handler: (msg, content, client) => {
    child.exec('sh ' + require.resolve('../bin/restart.sh'), (err, out, stderr) => {
      if (err) {
        console.log('Error Restarting Bot')
        msg.reply('Error restarting bot.')
        console.log('msg.author.id')
        console.log(err, stderr)
      } else {
        msg.reply('Restart succedded.')
      }
    })
  }
};
