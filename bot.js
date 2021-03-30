require("dotenv").config()
const ID = require("./data/id")
const Discord = require("discord.js")
const client = new Discord.Client()
const prefix = "&"

const fs = require("fs")

client.commands = new Discord.Collection()
client.listenersScript = new Discord.Collection()
client.data = new Discord.Collection()

const commandFiles = fs.readdirSync("./commands/").filter((file) => file.endsWith(".js"))
const listenersFiles = fs.readdirSync("./listeners/").filter((file) => file.endsWith(".js"))
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)

  client.commands.set(command.name, command)
}
const dataFiles = fs.readdirSync("./data/").filter((file) => file.endsWith(".json"))
for (const file of dataFiles) {
  fs.readFile(`./data/${file}`, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`)
    } else {
      // parse JSON string to JSON object
      const parseData = JSON.parse(data)
      client.data.set(parseData.name, parseData.db)
    }
  })
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
  client.listenersScript.get("reactionrole").pronounsRole(ID.roleMessage, client)
  client.listenersScript.get("reactionrole").sonicRole(client)

  console.log("I am ready!")
})

client.on("message", (message) => {
  // console.log(message)
  if (message.author.bot) return
  if (message.content.startsWith(prefix)) {
    let args = message.content.split("&")
    args = args[1].trim()
    if (client.commands.get(args) !== undefined) {
      client.commands.get(args).execute(client, message)
    } else {
      message.channel.send("la commande n'existe pas :(((((")
    }
  } else {
    console.log(message.content)
    client.listenersScript.get("reactmessages").listenMessages(client.data.get("list"), message)
  }
})
client.login(process.env.TOKEN)
