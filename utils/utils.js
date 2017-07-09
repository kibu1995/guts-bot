module.exports = {
    runCommand: function (commands, msg) {
        if (commands[msg.content]) {
            // Check if user can use command (is admin / has role)
            commands[msg.content].run(msg);
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