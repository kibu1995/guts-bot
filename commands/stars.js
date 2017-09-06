const youtubeHelper = require("../helpers/youtube.js");

module.exports = {
  "description": "Plays shooting stars (volume percentage)",
  "run": function (msg, args) {
    if (!msg.member.roles.some(r=>["Admin", "Bot"].includes(r.name))) {
      console.log(msg.member.roles);
      return msg.reply("Need correct roles to use this");
    }
    let shootingStars = "https://www.youtube.com/watch?v=feA64wXhbjo";
    let volume = args[0];

    if (isNaN(parseInt(volume))) {
      return youtubeHelper.playAudio(msg, shootingStars);
    } else {
      return youtubeHelper.playAudio(msg, shootingStars, volume);
    }
  }
}