import { TOKEN } from "token.js";

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

client.login(TOKEN);