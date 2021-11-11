const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

module.exports = {
  name: "play",
  description: "play music from YT in voice channel",
  async execute(client, message, args) {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel)
      return message.channel.send(
        "You need to be in a channel to execute this command!"
      );

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK"))
      return message.channel.send("You dont have the correct permissions");

    if (!args.length)
      return message.channel.send("You need to send the second argument!");

    const validURL = (str) => {
      var regex =
        /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      return regex.test(str);
    };

    const connection = await voiceChannel.join();

    if (validURL(args[0])) {
      if (!ytdl.validateURL(args[0])) {
        message.channel.send("only youtube url for now");
        return;
      }

      const stream = ytdl(args[0], { filter: "audioonly" });

      connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
        voiceChannel.leave();
      });

      await message.reply(
        `:notes: Now Playing *** ${await (
          await ytdl.getBasicInfo(args[0])
        ).player_response.videoDetails.title}***`
      );

      return;
    }

    const videoFinder = async (query) => {
      const videoResult = await ytSearch(query);

      return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
    };

    const video = await videoFinder(args.join(" "));

    if (video) {
      const stream = ytdl(video.url, { filter: "audioonly" });
      connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
        voiceChannel.leave();
      });

      await message.reply(`:notes: Now Playing ***${video.title}***`);
    } else {
      message.channel.send("No video results found");
    }
  },
};
