const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

module.exports = {
  name: "music",
  aliases: ["play", "stop", "skip", "queue"],
  description: "handle music from YT in voice channel",
  howTo:
    "&play (+ lien YT / + recherche) : lance la musique ou l'ajoute à la file d'attente \r &stop : coupe la musique \r &skip : musique suivante \r &queue : affiche la file d'attente",
  queue: null,

  async execute(client, message, cmd, args) {
    // check if voice channel can be used
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel)
      return message.channel.send(
        "cette commande est reservée aux personnes actuellement connectées en vocal"
      );

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK"))
      return message.channel.send("problème de permissions");

    if(this.queue && voiceChannel != this.queue.voice_channel)
      return message.channel.send("la musique ne peut être que dans un chan à la fois :pensive:");

    if (this.queue && message.channel != this.queue.text_channel) {
      message.channel.send(`ok, mais je suis déjà dans ${this.queue.text_channel} :face_with_spiral_eyes:`)
    }


    switch (cmd) {
      case "play":
        this.addToQueue(message, args);
        break;
      case "skip":
        this.playNext();
        break;
      case "stop":
        this.stop(message);
        break;
      case "queue":
        if (!this.queue || this.queue.songs.length === 0)
          return message.channel.send("no queue waiting");
        
        let queueContent = ":scroll: :hourglass: next :\r";
        for (let i = 0; i < this.queue.songs.length; i++) {
          queueContent +=  `**${i+1}** - ${this.queue.songs[i].title}\r`;
        }
        message.channel.send(queueContent);
        break
      case "music":
        message.channel.send(this.howTo);
        break;
      default:
        message.channel.send("la commande n'existe pas :(((((");
        break;
    }
  },

  async addToQueue(message, args) {
    // check if there is something to play
    if (!args.length)
      return message.channel.send("Il me faut un lien youtube ou des mots clés à chercher");

    let song = {};

    // check if there is a valid YT url
    if (ytdl.validateURL(args[0])) {
      song = {
        title: await (
          await ytdl.getBasicInfo(args[0])
        ).player_response.videoDetails.title,
        url: args[0],
      };
    } else {
      const video = await this.videoFinder(args.join(" "));

      if (video) {
        song = { title: video.title, url: video.url };
      } else {
        message.channel.send("No video results found");
        return;
      }
    }

    // add song to queue
    // creates queue if needed
    if (!this.queue) {
      this.queue = {
        voice_channel: message.member.voice.channel,
        text_channel: message.channel,
        connection: null,
        songs: [],
      };
      this.queue.songs.push(song);

      try {
        const connection = await this.queue.voice_channel.join();
        this.queue.connection = connection;
          this.playNext();
      } catch (err) {
        this.queue = null;
        message.channel.send("erreur de connexion");
        throw err;
      }

    } else {
      this.queue.songs.push(song);
      message.channel.send(
        `:hourglass: ***${song.title}*** ajouté à la liste d'attente (&queue pour la consulter)`
      );
    }
  },

  async playNext() {
    const song = this.queue.songs.shift();
    
    if (song) {
      const stream = ytdl(song.url, { filter: "audioonly" });
      this.queue.connection
        .play(stream, { seek: 0, volume: 1 })
        .on("finish", () => {
          this.playNext();
        });

      await this.queue.text_channel.send(
        `:notes: Now Playing *** ${song.title}***`
      );
    } else {
      this.queue.voice_channel.leave();
      this.queue.text_channel.send("la playlist est terminée, à plus tard :wave:");
      this.queue = null;
    }
  },

  async stop(message) {
    if (!this.queue) {
      await message.channel.send(
        "arreter quoi? je suis pas là :pleading_face:"
      );
    } else {
      await this.queue.voice_channel.leave();
      await message.channel.send("ok, bye :wave:");
      this.queue = null;
    }
  },

  async videoFinder(query) {
    const videoResult = await ytSearch(query);
    return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
  },
};
