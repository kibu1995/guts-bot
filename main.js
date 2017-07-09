const Discord = require("discord.js");
const Config = require("./config.json");
const client = new Discord.Client();
const utils = require("./utils/utils.js");
var commands = {};

function loadCommands() {
    let normalizedPath = require("path").join(__dirname, "commands");
    let commandList = {};

    require("fs").readdirSync(normalizedPath).forEach(function (file) {
        let fileName = file.substring(0, file.indexOf('.'));
        commandList[fileName] = require("./commands/" + file);
    });

    return commandList;
}

client.on('ready', function() {
    commands = loadCommands();
    console.log('Logged in and ready');
    client.user.setGame("(╯°□°)╯︵ ┻━┻");
});

client.on('message', function(msg) {

    if (msg.author.bot) return;

    if (msg.content === "help") {
        utils.help(commands, msg);
    } else {
        utils.runCommand(commands, msg);
    }
});

client.on('guildMemberAdd', function(member) {
    let channel = member.guild.channels.find('name', 'general');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}`);
});

client.login(Config.token);