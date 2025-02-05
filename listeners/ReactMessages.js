module.exports = {
  name: "reactmessages",
  description: "react to messages",
  async listenMessages(LIST, message) {
    if (
      message.channel.id === "639480012600377344" ||
      message.channel.id === "693171926432088215" ||
      message.channel.id === "625977705480847390" ||
      message.channel.id === "636530884287266816"
    )
      return

    for (const key in LIST) {
      if (Object.hasOwnProperty.call(LIST, key) && message.content.toLowerCase().includes(key)) {
        message.channel.send(LIST[key])
      }
    }
  },
}
