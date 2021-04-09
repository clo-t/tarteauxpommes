module.exports = {
  name: "color",
  description: "s'attribuer une couleur",
  async execute(client, message, args) {
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

    for (const role of userRoles) {
      if (role.name.startsWith("color")) {
        message.guild.members.cache.get(message.author.id).roles.remove(role.id)
      }
    }
    if (args[0 === "remove"]) return
    message.guild.roles
      .create({
        data: {
          name: `color ${args[0]}`,
          color: args[0],
        },
      })
      .then((role) => {
        message.guild.members.cache.get(message.author.id).roles.add(role.id)
      })
      .catch(console.error)
  },
}
