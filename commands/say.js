module.exports = {
  "description": "Says a given word/sentence",
  "run": function (msg, args) {
    const sayMessage = args.join(" ");
    msg.delete().catch(console.error);
    msg.channel.send(sayMessage, {tts: true});
  }
}