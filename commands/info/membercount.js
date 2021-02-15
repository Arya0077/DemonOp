const discord = require("discord.js");

module.exports = {
  name: "membercount",
  category: "info",
  description: "Get your id",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    .setDescription(
    `
Total Members - ${message.guild.memberCount}
Bots - ${message.guild.members.cache.filter(m => m.user.bot).size}`)
    .setColor("RANDOM")
    .setTimestamp(message.timestamp = Date.now())
    
    message.channel.send(embed)
    message.react("<a:GC_right:810000945562910761>");
  }
}