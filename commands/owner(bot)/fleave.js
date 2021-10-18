const { MessageEmbed, TextChannel } = require('discord.js');

module.exports = {
  name: 'fleave',
  aliases: [ 'forceleave', 'leaveguild', 'removeguild', 'leaveserver' ],
  ownerOnly: true,
  group: 'owner',
  description: 'Force Demon to leave a server',
  parameters: [ 'server ID', 'Reason' ],
  get examples(){ [ this.name, ...this.aliases ].map(x => x + ' 12345678901234567890')},
  run: async (client, message, [id = '', ...reason]) => {
    
     if (message.author.id !== '852612839629127711') return;

    if (!id.match(/\d{17,19}/)){
      return message.channel.send(`\\❌| ${message.author}, Please provide the ID of the server you want me to leave from.`);
    };

    const guild = client.guilds.cache.get(id);

    if (!guild){
      return message.channel.send(`\\❌ | ${message.author}, guild **${id}** does not exist on your cache`)
    };

    return guild.channels.cache.filter(c =>
      c instanceof TextChannel &&
      c.permissionsFor(client.user.me)
      .has([ 'VIEW_CHANNEL','SEND_MESSAGES' ]
    )).send(
      new MessageEmbed()
      .setColor('RED')
      .setTitle(`👋 My developer has requested that I leave ${guild.name}!`)
      .setDescription(`Reason:\n${reason.join(' ') || 'Unspecified'}`)
    ).then(() => guild.leave())
    .then(() => message.channel.send(`\\✔️ Sucessfully left the guild **${guild.name}**`))
    .catch(() => message.channel.send(`\\❗ Could not perform the operation.`));
  }
};
