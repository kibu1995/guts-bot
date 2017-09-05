const youtubeHelper = require("../helpers/youtube.js");

module.exports = {
  "description": "Plays bwekfast",
  "run": function (msg) {
    if (!msg.member.roles.some(r=>["Admin"].includes(r.name))) {
      return msg.reply("Need correct roles to use this");
    }
    let bwekfastUrl = "https://www.youtube.com/watch?v=3Dj6Swg4Rks";
    return youtubeHelper.playAudio(msg, bwekfastUrl);
  }
}