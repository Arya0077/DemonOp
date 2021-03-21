const { prefix } = require("./config.json");
const { config } = require("dotenv");
const { Random } = require("something-random-on-discord") 
const { GiveawaysManager } = require("discord-giveaways");
const db = require("quick.db");
const { CanvasSenpai } = require("canvas-senpai");
const canva = new CanvasSenpai();
const discord = require("discord.js");
const client = new discord.Client({
  disableEveryone: false
});
const moment = require("moment");
require("./uptime.js");
client.db = require("quick.db");
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("guildCreate", async guild => {
  let Invite = await guild.channels.cache
    .find(c => c.type === "text")
    .createInvite({
      maxAge: 0,
      maxUser: 0
    });
  const owner = client.users.cache.get(guild.ownerID);
  const joinchannel = client.channels.cache.get("812164778171564083");
  const joinembed = new discord.MessageEmbed()
    .setTitle("NEW SERVER")
    .addField("Server Name", `${guild.name}`)
    .addField("Server Owner", `${owner.username}`)
    .addField("Member Count", guild.memberCount)
    .addField("Invite Link", `[Invite](${Invite})`)
    .setColor("GREEN")
    .setFooter("Joined A New Guild")
    .setTimestamp()
    .setThumbnail(guild.iconURL());
  joinchannel.send(joinembed);
});

client.on("guildDelete", async guild => {
  const owner = client.users.cache.get(guild.ownerID);
  const lchannel = client.channels.cache.get("818749862539427901");
  const lembed = new discord.MessageEmbed()

    .setTitle("SERVER LEFT")
    .addField("Server Name", `${guild.name}`)
    .addField("Server Owner", `${owner.username}`)
    .addField("Member Count", guild.memberCount)
    .setColor("#ff0000")
    .setFooter("Left A Guild")
    .setTimestamp()
    .setThumbnail(guild.iconURL());
  lchannel.send(lembed);
});

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("ready", async () => {
  const channel = client.channels.cache.get("811294182823428116");
  channel.join().then(connection => {
    connection.voice.setSelfDeaf(true);
  });
  });

  client.on("ready", async () => {
  console.log(client.user.tag + " Has Logged In");
  client.user
    .setActivity(`Servers : ${await client.guilds.cache.size} | Users : ${await client.users.cache.size}`, { type: "WATCHING" })
    .catch(error => console.log(error));
});

    client.on("message", async message => {
      const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);

      if (message.content.match(prefixMention)) {
        let mention = new discord.MessageEmbed()
          .setTitle(
            ` ${client.user.username} `
          )
          .addField(
            "➡️ PREFIX",
            `\`${prefix}\``
          )
          .addField(
            "🛠️ USAGE",
            "`" +
              prefix +
              "help` - for bots help menu \n" +
              "`" +
              prefix +
              "support` - for bots support \n" +
              "`" +
              prefix +
              "invite` - to invite the bot in youre server \n" +
              "`" +
              prefix +
              "author` to get the details about bot developer \n"
          )
          .setColor("#ff0000")
          .setThumbnail(client.user.displayAvatarURL())
          .setFooter(
            "Requested By : " + message.author.tag,
            message.author.displayAvatarURL()
          )
          .setTimestamp((message.timestamp = Date.now()));
        message.channel.send(mention);
        return;
      }

      if (message.author.bot) return;
      if (!message.guild) return;
      if (!message.content.startsWith(prefix)) return;

      if (!message.member)
        message.member = await message.guild.fetchMember(message);
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});

client.on("guildMemberAdd", async member => {
  let chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) {
    return;
  }

  let default_url = `https://cdn.discordapp.com/attachments/758912722821185557/814740225732640778/tenor.gif`;

  let default_msg = `<a:op2_:764200161793540106> **MAKE SURE TO READ RULES**

<a:op2_:764200161793540106> **TAKE SELF ROLES**

<a:op2_:764200161793540106> **ENJOY YOUR STAY HERE**

`;

  let m1 = db.get(`msg_${member.guild.id}`);
  if (!m1) m1 = default_msg;
  const msg = m1
    .replace("{member}", member.user)
    .replace("{member.guild}", member.guild)
    .replace("{member.user.tag}", member.user.tag)
    .replace("{member.user.usercount}", member.user.usercount);

  // let data = await canva.welcome(member, {
  //   link: "https://wallpapercave.com/wp/wp5128415.jpg"
  // });

  let url = db.get(`url_${member.guild.id}`);
  if (url === null) url = default_url;
  let createdate = moment.utc(member.createdAt).format("ddd, Do MMMM YYYY");

  // let link = db.get(`link_${member.guild.id}`);
  //if (link === null) link = link;

  //const attachment = new discord.MessageAttachment(data, "welcome-image.png");

  let wembed = new discord.MessageEmbed()
    .setAuthor(member.guild)
    .setTitle("━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    // .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
    .setColor("RANDOM")
    .setImage(url)
    .setTimestamp()
    .setDescription(msg)
    .setFooter(member.user.tag, member.user.displayAvatarURL())
    .addField(
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      `

<a:cetick:764199790640365609> **MEMBER USERNAME :-** __**${member.user.tag}**__

<a:cetick:764199790640365609> **MEMBER JOINED AT :-** __**${createdate}**__

<a:cetick:764199790640365609> **MEMBER COUNT :-** **__${member.guild.memberCount}__**

`
    )
    .addField(
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      `

<a:emoji_24:764200718344126546> **THANKS FOR JOINING ${member.guild}** <a:emoji_24:764200718344126546>`
    );

  client.channels.cache.get(chx).send(wembed);
  //  client.channels.cache.get(chx).send(attachment);
});


const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
  // This function is called when the manager needs to get all the giveaway stored in the database.
  async getAllGiveaways() {
    // Get all the giveaway in the database
    return db.get("giveaways");
  }
  // This function is called when a giveaway needs to be saved in the database (when a giveaway is created or when a giveaway is edited).
  async saveGiveaway(messageID, giveawayData) {
    // Add the new one
    db.push("giveaways", giveawayData);
    // Don't forget to return something!
    return true;
  }

  async editGiveaway(messageID, giveawayData) {
    // Gets all the current giveaways
    const giveaways = db.get("giveaways");
    // Remove the old giveaway from the current giveaways ID
    const newGiveawaysArray = giveaways.filter(
      giveaway => giveaway.messageID !== messageID
    );
    // Push the new giveaway to the array
    newGiveawaysArray.push(giveawayData);
    // Save the updated array
    db.set("giveaways", newGiveawaysArray);
    // Don't forget to return something!
    return true;
  }

  // This function is called when a giveaway needs to be deleted from the database.
  async deleteGiveaway(messageID) {
    // Remove the giveaway from the array
    const newGiveawaysArray = db
      .get("giveaways")
      .filter(giveaway => giveaway.messageID !== messageID);
    // Save the updated array
    db.set("giveaways", newGiveawaysArray);
    // Don't forget to return something!
    return true;
  }
};

if (!db.get("giveaways")) db.set("giveaways", []);

// Create a new instance of your new class

const manager = new GiveawayManagerWithOwnDatabase(client, {
  storage: false,
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
    embedColor: "RED",
    reaction: "🎉"
  }
});

client.giveawaysManager = manager;
// We now have a client.giveawaysManager property to manage our giveaways!
client.giveawaysManager.on(
  "giveawayReactionAdded",
  (giveaway, member, reaction) => {
    console.log(
      `${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`
    );
  }
);

client.giveawaysManager.on(
  "giveawayReactionRemoved",
  (giveaway, member, reaction) => {
    console.log(
      `${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`
    );
  }
);


client.login(process.env.TOKEN);
