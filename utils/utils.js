const Config = require("../config.json");

module.exports = {
    runCommand: function (commands, msg) {
        let args = msg.content.slice(Config.prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();

        if (commands[command]) {
          commands[command].run(msg, args);
        } else {
            msg.reply("Not a function");
        }
    },
    help: function (commands, msg) {
        let helpMessage = "";

        Object.keys(commands).forEach(function (key) {
            helpMessage += '\n';
            helpMessage += key + " : " + commands[key].description;
        });

        msg.reply(helpMessage);
    }
}