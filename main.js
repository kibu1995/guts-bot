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

var bwekfast = function (message) {
    if (message.member.roles.find("name", "Moderator")) playYoutubeAudio(message, "https://www.youtube.com/watch?v=3Dj6Swg4Rks");
}

var flip = function (message) {

    var coinFlip = 1 + Math.floor(Math.random() * 2);

    if (coinFlip == 1) {

        message.reply("Coin landed on HEADS");

    } else if (coinFlip == 2) {

        message.reply("Coin landed on TAILS");
    }
}

var meme = function (message) {
    message.channel.sendMessage("http://i.imgur.com/KsYpXaP.gifv");
}

var spicy = function (message) {
    message.channel.sendMessage("https://www.youtube.com/watch?v=rhC9KVo7S0c&feature=youtu.be");
    if (message.member.roles.find("name", "Moderator")) playYoutubeAudio(message, "https://www.youtube.com/watch?v=rhC9KVo7S0c");
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

var youtube = function (message, searchTerms) {

    youTube.search(searchTerms, 1, function (error, result) {
        if (error) errorReply(error, message);
        else {
            if (!result || !result.items || result.items.length < 1) {
                errorReply("No Result", message);
            } else {
                if (!result.items[0].id.videoId) {
                    message.reply("Search returned a channel, please be more specific with search terms");
                } else {
                    message.reply("http://www.youtube.com/watch?v=" + result.items[0].id.videoId);
                }
            }
        }
    });
}



 */