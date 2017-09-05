const youtubeHelper = require("../helpers/youtube.js");

module.exports = {
  "description": "Replies to a spicy meme",
  "run": function (msg) {
    let videoUrl = "https://www.youtube.com/watch?v=rhC9KVo7S0c";

    if (msg.member.roles.some(r=>["Admin", "Mod"].includes(r.name))) {
      return youtubeHelper.playAudio(msg, "https://www.youtube.com/watch?v=rhC9KVo7S0c");
    } else {
      return msg.channel.send(videoUrl);
    }
  }
}