module.exports = {
  name: "reactionrole",
  description: "Sets up a reaction role message!",
  async pronounsRole(roleMessageId, client) {
    client.on("messageReactionAdd", async (reaction, user) => {
      let message = reaction.message,
        emoji = reaction.emoji
      if (message.id !== roleMessageId) return

      console.log("add")

      switch (emoji.name) {
        case "ccomplik":
          await message.guild.members.cache.get(user.id).roles.add("825323709773774899")
          break

        default:
          break
      }
    })

    client.on("messageReactionRemove", async (reaction, user) => {
      let message = reaction.message,
        emoji = reaction.emoji
      if (message.id !== roleMessageId) return

      console.log("remove")

      switch (emoji.name) {
        case "ccomplik":
          console.log(message.guild.members.cache)
          await message.guild.members.cache.get(user.id).roles.remove("825323709773774899")
          break

        default:
          break
      }
    })
  },
  async sonicRole(client) {
    client.on("messageReactionAdd", async (reaction, user) => {
      let message = reaction.message,
        emoji = reaction.emoji

      if (emoji.name == "sonic2" || emoji.name == "sonic") {
        await message.guild.members.cache.get(user.id).roles.add("825323724164431883")
      }
    })
  },
}
