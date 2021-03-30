module.exports = {
  name: "reactmessages",
  description: "react to messages",
  async listenMessages(LIST, message) {
    for (const key in LIST) {
      if (Object.hasOwnProperty.call(LIST, key) && message.content.toLowerCase().includes(key)) {
        message.channel.send(LIST[key])
      }
    }
  },
}
