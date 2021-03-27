module.exports = {
  name: "reactionrole",
  description: "Sets up a reaction role message!",
  async genderRole(roleMessageId, client) {
    client.on("messageReactionAdd", (reaction, user) => {
      let message = reaction.message,
        emoji = reaction.emoji
      console.log(message.id, " / ", roleMessageId)
      if (message.id !== roleMessageId) return

      console.log("react")
      if (emoji.name == "✅") {
        // We don't have the member, but only the user...
        // Thanks to the previous part, we know how to fetch it
        // message.guild.fetchMember(user.id).then((member) => {
        //   member.addRole("role_id")
        // })
        console.log("add")
      } else if (emoji.name == "❎") {
        console.log("remove")
        // message.guild.fetchMember(user.id).then((member) => {
        //   member.removeRole("role_id")
        // })
      }
    })
  },
}
