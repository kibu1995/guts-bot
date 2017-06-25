const Discord = require("discord.js");
const Config = require("./config.json");
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Logged in and ready');
});

client.on('message', msg => {

    if (msg.author.bot) return;


    switch (msg.content) {
        case "ping":
            msg.reply("Pong!");
            break;
        default:
            msg.reply("Not a function");
            break;
    }


});

client.login(Config.token);