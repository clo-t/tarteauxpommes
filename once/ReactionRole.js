module.exports = {
  name: "reactionrole",
  description: "Sets up a reaction role message!",
  async genderRole(roleMessageId, client) {
    client.on("messageReactionAdd", async (reaction, user) => {
      let message = reaction.message,
        emoji = reaction.emoji
      console.log(message.id, " / ", roleMessageId)
      if (message.id !== roleMessageId) return

      if (emoji.name == "sonic2") {
        // message.guild.member.fetch(user.id).then((member) => {
        //   member.addRole("825323724164431883")
        // })
        await message.guild.members.cache.get(user.id).roles.add("825323724164431883")
        console.log("add")
      } else if (emoji.name == "❎") {
        console.log("remove")
        // message.guild.fetchMember(user.id).then((member) => {
        //   member.removeRole("role_id")
        // })
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
