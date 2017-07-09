const Discord = require("discord.js");
const Config = require("./config.json");
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Logged in and ready');
    client.setGame("(╯°□°)╯︵ ┻━┻");
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

client.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find('name', 'general');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}`);
});

client.login(Config.token);