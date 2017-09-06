const youtubeHelper = require("../helpers/youtube.js");
const yt = require('ytdl-core');
const musicPrefix = "!music ";
const dispPrefix = "¬";
const volumePercentJump = 5;

var play = function (msg) {
  if (queue[msg.guild.id] === undefined) return msg.channel.send(`Add some songs to the queue first with ${musicPrefix}add`);
  if (!msg.guild.voiceConnection) return join(msg).then(() => play(msg));
  if (queue[msg.guild.id].playing) return msg.channel.send('Already Playing');
  let dispatcher;
  const voiceChannel = msg.member.voiceChannel;
  queue[msg.guild.id].playing = true;

  (function play(song) {
    if (song === undefined) return msg.channel.send('Queue is empty').then(() => {
      queue[msg.guild.id].playing = false;
      voiceChannel.leave();
    });
    msg.channel.send(`Playing: **${song.title}** requested by: **${song.requester}**`);
    dispatcher = msg.guild.voiceConnection.playStream(yt(song.url, { audioonly: true, quality: "lowest" }), { passes: 3, volume: 0.1, seek: 0 });
    let collector = msg.channel.createCollector(m => m);
    collector.on('collect', m => {
      if (m.content.startsWith(dispPrefix + 'pause')) {
        msg.channel.send('paused').then(() => { dispatcher.pause(); });
      } else if (m.content.startsWith(dispPrefix + 'resume')) {
        msg.channel.send('resumed').then(() => { dispatcher.resume(); });
      } else if (m.content.startsWith(dispPrefix + 'skip')) {
        msg.channel.send('skipped').then(() => { dispatcher.end(); });
      } else if (m.content.startsWith(dispPrefix + 'volume+')) {
        if (Math.round(dispatcher.volume * 50) >= 100) return msg.channel.send(`Volume: ${Math.round(dispatcher.volume * 50)}%`);
        dispatcher.setVolume(Math.min((dispatcher.volume * 50 + (volumePercentJump * (m.content.split('+').length - 1))) / 50, 2));
        msg.channel.send(`Volume: ${Math.round(dispatcher.volume * 50)}%`);
      } else if (m.content.startsWith(dispPrefix + 'volume-')) {
        if (Math.round(dispatcher.volume * 50) <= 0) return msg.channel.send(`Volume: ${Math.round(dispatcher.volume * 50)}%`);
        dispatcher.setVolume(Math.max((dispatcher.volume * 50 - (volumePercentJump * (m.content.split('-').length - 1))) / 50, 0));
        msg.channel.send(`Volume: ${Math.round(dispatcher.volume * 50)}%`);
      } else if (m.content.startsWith(dispPrefix + 'time')) {
        msg.channel.send(`time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000) / 1000) < 10 ? '0' + Math.floor((dispatcher.time % 60000) / 1000) : Math.floor((dispatcher.time % 60000) / 1000)}`);
      }
    });
    dispatcher.on('end', () => {
      collector.stop();
      queue[msg.guild.id].songs.shift();
      play(queue[msg.guild.id].songs[0]);
    });
    dispatcher.on('error', (err) => {
      return msg.channel.send('error: ' + err).then(() => {
        collector.stop();
        queue[msg.guild.id].songs.shift();
        play(queue[msg.guild.id].songs[0]);
      });
    });
  })(queue[msg.guild.id].songs[0]);
}

var join = function (msg) {
  return new Promise((resolve, reject) => {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('I couldn\'t connect to your voice channel...');
    voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
  });
}

var add = function (msg, videoUrl) {
  let url = videoUrl.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");

  if (url == '' || url === undefined) return msg.channel.send(`You must add a url, or youtube video id after ${musicPrefix}add`);
  yt.getInfo(url, (err, info) => {
    if (err) return msg.channel.send('Invalid YouTube Link: ' + err);
    if (!queue.hasOwnProperty(msg.guild.id)) queue[msg.guild.id] = {}, queue[msg.guild.id].playing = false, queue[msg.guild.id].songs = [];
    queue[msg.guild.id].songs.push({ url: url, title: info.title, requester: msg.author.username });
    msg.channel.send(`added **${info.title}** to the queue`);
  });
}

var queue = function (msg) {
  if (queue[msg.guild.id] === undefined) return msg.channel.send(`Add some songs to the queue first with ${musicPrefix}add`);
  let tosend = [];
  queue[msg.guild.id].songs.forEach((song, i) => { tosend.push(`${i + 1}. ${song.title} - Requested by: ${song.requester}`); });
  msg.channel.send(`__**${msg.guild.name}'s Music Queue:**__ Currently **${tosend.length}** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0, 15).join('\n')}\`\`\``);
}

var help = function (msg) {
  let tosend = ['```xl', musicPrefix +
    'join : "Join Voice channel of msg sender"',
    musicPrefix + 'add : "Add a valid youtube link to the queue"',
    musicPrefix + 'queue : "Shows the current queue, up to 15 songs shown."',
    musicPrefix + 'play : "Play the music queue if already joined to a voice channel"',
    '',
    'the following commands only function while the play command is running:'.toUpperCase(),
    dispPrefix + 'pause : "pauses the music"',
    dispPrefix + 'resume : "resumes the music"',
    dispPrefix + 'skip : "skips the playing song"',
    dispPrefix + 'time : "Shows the playtime of the song."',
    dispPrefix + 'volume+(+++) : "increases volume by ' + volumePercentJump + '%/+"',
    dispPrefix + 'volume-(---) : "decreases volume by ' + volumePercentJump + '%/-"', '```'];
  msg.channel.send(tosend.join('\n'));
}

module.exports = {
  "description": "Holds functions for music/playlists",
  "run": function (msg, args) {
    if (!args) return;
    var func = args[0];
    var url = args[1];
    
    switch (func) {
      case "play":
        play(msg);
        break;
      case "join":
        join(msg);
        break;
      case "add":
        add(msg, url);
        break;
      case "queue":
        queue(msg);
        break;
      case "help":
        help(msg);
        break;
      default:
        msg.reply("Enter a valid music function. Use " + musicPrefix + "music help");
    }
  }
}