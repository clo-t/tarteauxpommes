const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
    console.log(message)
  if (message.content.toLowerCase().includes("sonic") && message.author.bot !== true) {
    message.channel.send("<:sonic2:651455554639888384>");
  }
});

client.login("ODIzNTQ1NjUwMTg4MTI0MTky.YFiYpw.SpcYIaAez4QjA9qbbGtBk0h4jEc");