module.exports = {
  "description": "Kicks a given user",
  "run": function (msg, args) {
    if (!msg.member.roles.some(r=>["Admin", "Mod"].includes(r.name))) {
      return msg.reply("Need correct roles to use this");
    }
    
    let member = msg.mentions.members.first();
    if (!member) return msg.reply("Mention a valid user!");
    if (!member.kickable) return msg.reply("Can't kick mentioned user!");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason given!";
    
    member.kick(reason).catch(error => msg.reply("Can't kick user: " + error));
    msg.reply("Kicked " + member.user.tag + " for " + reason);
  }
}