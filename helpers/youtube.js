const ytdl = require('ytdl-core');

module.exports = {
  "playAudio": function (msg, videoUrl) {
    let voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) return msg.reply("You're not in a voice channel");
    if (!/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/.test(videoUrl)) return msg.reply("Check the link is correct");

    return voiceChannel.join()
      .then(connnection => {
        let stream = ytdl(videoUrl, { filter: 'audioonly' });
        let streamOptions = { seek: 0, volume: 0.1, passes: 3 };
        let dispatcher = connnection.playStream(stream, streamOptions);
        dispatcher.on('end', () => voiceChannel.leave());
      });
  }
}