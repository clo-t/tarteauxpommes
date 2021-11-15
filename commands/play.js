const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

module.exports = {
  name: "music",
  aliases: ["play", "stop"],
  description: "handle music from YT in voice channel",
  howTo: "play + lien YT ou mots clés à rechercher : lance la musique \r stop : coupe la musique",

  async execute(client, message, cmd, args) {

    // check if voice channel can be used
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel)
      return message.channel.send(
        "cette commande est reservée au personne actuellement connectées en vocal"
      );

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK"))
      return message.channel.send("problème de permissions");

    switch (cmd) {
      case ("play"):
        this.play(message, args);
        break;
      case ("stop"):
        this.stop(message);
        break;
      case ("music"):
        message.channel.send(this.howTo);
        break;
      default:
        message.channel.send("la commande n'existe pas :(((((");
        break;
    }
  },


  async play(message, args) {
    message.channel.send("tralala");
    // check if there is somthing to play
    if (!args.length)
      return message.channel.send("You need to send the second argument!");


    let url = "";
    let name = "";


    // check if there is a valid YT url
    const validURL = (str) => {
      var regex =
        /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      return regex.test(str);
    };

    if (validURL(args[0])) {
      if (!ytdl.validateURL(args[0])) {
        return message.channel.send("only youtube url for now");
      }

      url = args[0];
      name = await (
        await ytdl.getBasicInfo(args[0])
      ).player_response.videoDetails.title
    
    } else {

      const videoFinder = async (query) => {
        const videoResult = await ytSearch(query);

        return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
      };

      const video = await videoFinder(args.join(" "));

      if (video) {
        url = video.url;
        name = video.title;
      } else {
        message.channel.send("No video results found");
        return
      }
    }
   
   
  //  play music
    const voiceChannel = message.member.voice.channel;
    const connection = await voiceChannel.join();
    const stream = ytdl(url, { filter: "audioonly" });

      connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
        voiceChannel.leave();
      });

      await message.reply(
        `:notes: Now Playing *** ${name}***`
      );
  },

  async stop(message) {
    const voiceChannel = message.member.voice.channel;

    await voiceChannel.leave();
    await message.channel.send("ok, bye");
  },
};
