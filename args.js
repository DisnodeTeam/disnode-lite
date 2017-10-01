exports.ParseMessage = function (msg) {
  var args = {}
  args.prefix = msg[0];
  var split = msg.split(" -");
  args.cmd = split[0].split(" ")[0];
  args.args = [];
  for (var i = 1; i < split.length; i++) {
    var argument = split[i].split(" ");
    var arg = argument[0];
    argument.shift()
    args.args.push({arg: arg, data: argument.join(" ")});
  }
  return args;
};
