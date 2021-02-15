const discord = require("discord.js");
const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports = {
  name: "kiss",
  category: "fun",
  description: "Kiss someone",
  run: async (client, message, args) => {
    
    let target = message.mentions.members.first()
    
    let data = await random.getAnimeImgURL("kiss");
    
    let embed = new discord.MessageEmbed()
    .setImage(data)
    .setColor("RANDOM")
    .setFooter(`${message.author.username} kisses ${target.user.username}`)
    
    message.channel.send(embed);
    message.react("<a:GC_right:810000945562910761>");
  }
};