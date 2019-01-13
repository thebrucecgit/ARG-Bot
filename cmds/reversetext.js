module.exports = {
  hits: ['reversetext', 'revtext', 'rt'],
  handler: (msg, content) => {
    const res = {};
    res.commandName = "Reverse Text";
    var arr = content.split("");
    var newArr = [];
    arr.forEach(function(char){
        newArr.unshift(char);
    });
    res.output = newArr.join("");
    res.input = content;
    return res;
  }
};
