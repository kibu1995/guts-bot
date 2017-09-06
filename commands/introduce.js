const Discord = require("discord.js");

module.exports = {
  "description": "Replies with an introduction",
  "run": function (msg) {
    var kappa = msg.channel.guild.emojis.find("name", "kappa") || "Ayyyy lmao.";

    const embed = new Discord.RichEmbed()
              .setTitle('Introduction')
              .setAuthor('Jonny-Bot 2.0', "https://cdn.discordapp.com/app-icons/354496948746715136/6e24442f48b0f204d97088dbd9f41f46.png")
              .setColor(0x00AE86)
              .setDescription("Hello. I'm Jonny. Jonny Jonny Jonny.")
              .setFooter('KappaPride')
              .setTimestamp()
              .addField('Do I work?', kappa, true)
              .addField('\u200b', '\u200b', true)
              .addField('Will I be finished?', 'Probably Soon™', true);
    return msg.channel.send({ embed });
  }
}