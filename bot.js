const TOKEN = require("./token")
const LIST = require("./data/list")
const ID = require("./data/id")
const reactionRole = require("./once/ReactionRole")

const Discord = require("discord.js")
const client = new Discord.Client()
const prefix = "&"

const fs = require("fs")

client.commands = new Discord.Collection()
client.listenersScript = new Discord.Collection()

const commandFiles = fs.readdirSync("./commands/").filter((file) => file.endsWith(".js"))
const listenersFiles = fs.readdirSync("./listeners/").filter((file) => file.endsWith(".js"))
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)

  client.commands.set(command.name, command)
}

for (const file of listenersFiles) {
  const listener = require(`./listeners/${file}`)

  client.listenersScript.set(listener.name, listener)
}

client.on("ready", () => {
  client.guilds.cache
    .get(ID.avalanche)
    .channels.cache.get(ID.roleChannel)
    .messages.fetch(ID.roleMessage)

  reactionRole.genderRole(ID.roleMessage, client)
  reactionRole.sonicRole(client)
  console.log("I am ready!")
})

client.on("message", (message) => {
  // console.log(message)
  if (message.author.bot) return
  if (message.content.startsWith(prefix)) {
    console.log("this is a command")
  } else {
    //console.log(message.guild.roles.cache)
    client.listenersScript.get("reactmessages").listenMessages(LIST, message)
  }
})

client.login(TOKEN)
