//const { default_prefix, token } = require('../config.json');
const Discord = require('discord.js');
const { owners } = require("../../config.json")

  module.exports = {
 name: 'setusername',
    category: "owner",
  description: 'Sets new Username for bot.',
    enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4,
    run: async  (client, message, args) => {
    if (message.author.id !== '852612839629127711') return;
    const sayMessage = args.join(` `);
    client.user.setUsername(sayMessage);
  const usernameEmbedOther = new Discord.MessageEmbed()
  .setTitle(`New Username`)
  .setDescription(sayMessage)
  .setColor("#ff00b5")
  message.channel.send(usernameEmbedOther);
  return;
      
  //}

//exports.perms = {
  
},

//exports.help = {
 
usage: 'setusername <username>' 
}
 //   }