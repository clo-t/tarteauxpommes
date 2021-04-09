module.exports = {
  name: "list",
  description: "Liste des réactions de messages",
  async execute(client, message, args) {
    let answer = `La liste des mots clefs :\n`
    for (const key in client.data.get("list")) {
      if (Object.hasOwnProperty.call(client.data.get("list"), key)) {
        answer += ` - ${key} : ${client.data.get("list")[key]}\n`
      }
    }
    message.channel.send(answer)
  },
}
