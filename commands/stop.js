module.exports = {
    name: 'stop',
    description: 'stop the music in voice channel and kick bot',
    async execute(client, message, args){
        const voiceChannel = message.member.voice.channel;
 
        if (!voiceChannel) return message.channel.send('cette commande est reservée au personne actuellement connectées en vocal');

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('problème de permissions');
        if (!permissions.has('SPEAK')) return message.channel.send('problème de permissions');

        await voiceChannel.leave();
        await message.channel.send('ok, bye')
    }
}