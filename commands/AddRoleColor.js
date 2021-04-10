module.exports = {
  name: "color",
  description: "s'attribuer une couleur",
  async execute(client, message, args) {
    //@TODO : remove unused roles in real time
    let reHex = new RegExp(/^#[0-9A-F]{6}$/, "i")
    if (!reHex.test(args[0]) && args[0] !== "remove") {
      message.channel.send(
        "Valeur de l'argument invalide, il faut une valeur hexadécimal, par exemple `&color #4b9e90` (avec le # et 6 caractères parce que je suis pas très évolué)\nPour t'aider : https://duckduckgo.com/?q=color+picker&t=newext&atb=v263-1&ia=answer\n`&color remove` pour supprimer ta couleur"
      )
      return
    }

    let userRoles = message.guild.members.cache.get(message.author.id).roles.cache.map((r) => ({
      id: r.id,
      name: r.name,
    }))

    let guildRoles = message.guild.roles.cache.map((r) => ({
      id: r.id,
      name: r.name,
    }))
    //let guild = message.guild.members.fetch().then(console.log)

    let isRoleExist = false
    let existingRoleID = ""

    for (const role of guildRoles) {
      // check if other color are assigned
      if (role.name.startsWith("color ") && `color ${args[0]}` !== role.name) {
        let members = message.guild.roles.cache.get(role.id).members.map((m) => m.user.tag)
        console.log(
          role.name,
          " -> ",
          message.guild.roles.cache.get(role.id).members.map((m) => m.user.tag)
        )
        if (members.length === 0) {
          message.guild.roles.cache.get(role.id).delete()
        }
      }
      // check if role existing
      if (`color ${args[0]}` === role.name) {
        //message.channel.send(`role exist -> ${role.name} :  ${role.id}`)
        isRoleExist = true
        existingRoleID = role.id
      }
    }

    for (const role of userRoles) {
      if (role.name.startsWith("color")) {
        message.guild.members.cache.get(message.author.id).roles.remove(role.id)
      }
    }
    if (args[0] === "remove") return
    if (!isRoleExist) {
      message.guild.roles
        .create({
          data: {
            name: `color ${args[0]}`,
            color: args[0],
            mentionable: false,
          },
        })
        .then((role) => {
          message.guild.members.cache.get(message.author.id).roles.add(role.id)
        })
        .catch(console.error)
    } else {
      console.log("role exist")
      message.guild.members.cache.get(message.author.id).roles.add(existingRoleID)
    }
  },
}
