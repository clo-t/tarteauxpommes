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
const dataFiles = fs.readdirSync("./data/").filter((file) => file.endsWith(".json"))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)

  client.commands.set(command.name, command)
}

for (const file of listenersFiles) {
  const listener = require(`./listeners/${file}`)

  client.listenersScript.set(listener.name, listener)
}

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


client.on("ready", () => {
  if (process.env.DEV !== "TRUE") {
    client.guilds.cache
      .get(ID.avalanche)
      .channels.cache.get(ID.roleChannel)
      .messages.fetch(ID.roleMessage)

    client.guilds.cache.get(ID.avalanche).members.fetch()
    client.listenersScript.get("reactionrole").pronounsRole(ID.roleMessage, ID.role, client)
    client.listenersScript.get("reactionrole").sonicRole(client)
  }

  console.log("I am ready!")
})

client.on("message", (message, user) => {
  if (message.author.bot) return
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const cmd = args.shift().toLowerCase()

    const command = client.commands.get(cmd) || client.commands.find(a=> a.aliases && a.aliases.includes(cmd));

    if (command) {
      command.execute(client, message, cmd, args)
    } else {
      message.channel.send("la commande n'existe pas :(((((")
    }
  } else {
    client.listenersScript.get("reactmessages").listenMessages(client.data.get("list"), message)
  }
})


// always keep at the last line
client.login(process.env.TOKEN)
