module.exports = {
  name: "reactionrole",
  description: "Sets up a reaction role message!",
  async pronounsRole(roleMessageId, role, client) {
    client.on("messageReactionAdd", async (reaction, user) => {
      let message = reaction.message,
        emoji = reaction.emoji
      if (message.id !== roleMessageId) return

      console.log("add -> ", emoji.name)

      switch (emoji.name) {
        case "🧜‍♀️":
          await message.guild.members.cache.get(user.id).roles.add(role.elle)
          break
        case "🧜‍♂️":
          await message.guild.members.cache.get(user.id).roles.add(role.il)
          break
        case "🧜":
          await message.guild.members.cache.get(user.id).roles.add(role.iel)
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
        case "🧜‍♀️":
          console.log(message.guild.members.cache)
          await message.guild.members.cache.get(user.id).roles.remove(role.elle)
          break
        case "🧜‍♂️":
          console.log(message.guild.members.cache)
          await message.guild.members.cache.get(user.id).roles.remove(role.il)
          break
        case "🧜":
          console.log(message.guild.members.cache)
          await message.guild.members.cache.get(user.id).roles.remove(role.iel)
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
