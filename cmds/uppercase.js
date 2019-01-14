module.exports = {
  hits: ['upc', 'uppercase', 'upcase'],
  handler: (msg, content) => {
    const res = {};
    res.commandName = "Uppercase Letters Only";
    res.output = [];
    var arr = content.trim().split("");
    var letters = /^[A-Za-z]+$/;
    for (var i = 0; i < arr.length; i++) {
        if(arr[i].match(letters) && arr[i] === arr[i].toUpperCase()) {
            res.output.push(arr[i]);
        }
    }
    res.output = res.output.join("");
    res.input = content;
    return res;
  }
};
