const TOKEN = require("./token.js")
const LIST = require("./list.js")

const Discord = require("discord.js")
const client = new Discord.Client()
//const guild = new Discord.Guild()

client.on("ready", () => {
  console.log("I am ready!")
  // avalanche id 619131910391857153
})

client.on("message", (message) => {
  // console.log(message)
  if (message.author.bot !== true) {
    for (const key in LIST) {
      if (Object.hasOwnProperty.call(LIST, key) && message.content.toLowerCase().includes(key)) {
        message.channel.send(LIST[key])
      }
    }
  }
})

client.login(TOKEN)
