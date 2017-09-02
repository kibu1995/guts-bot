const Discord = require("discord.js");
const Config = require("./config.json");
const client = new Discord.Client();
const utils = require("./utils/utils.js");
const fileHelper = require("./helpers/file.js")
// Constant Paths/Strings
const commandPath = require("path").join(__dirname, "commands");
// Application Global Variables
var commands = {};

client.on('ready', function () {
    commands = fileHelper.loadCommands(commandPath);
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