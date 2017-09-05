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
    if (!msg.content.startsWith(Config.prefix)) return;

    if (msg.content === "!help") {
        utils.help(commands, msg);
    } else {
        utils.runCommand(commands, msg);
    }
});

client.login(Config.token);

/*

var flip = function (message) {

    var coinFlip = 1 + Math.floor(Math.random() * 2);

    if (coinFlip == 1) {

        message.reply("Coin landed on HEADS");

    } else if (coinFlip == 2) {

        message.reply("Coin landed on TAILS");
    }
}

var roll = function (message, sides) {

    var diceRoll = 1 + Math.floor(Math.random() * sides);
    message.reply("You rolled a " + diceRoll);
}

var gif = function (message, searchTerms) {

    Giphy.search({
        q: searchTerms,
        limit: 1,
        rating: 'r',
        fmt: 'json'
    }).then(outputGif).catch(function (error) {
        errorReply(error, message);
    });

    function outputGif(res) {
        if (res.data[0]) {
            message.reply(res.data[0].url);
        } else {
            errorReply("No Result", message);
        }
    }
}
 */