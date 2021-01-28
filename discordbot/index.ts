import Discord from 'discord.js'
import { DISCORD_BOT_TOKEN } from '../constants';
export const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    // Here you can fill content like guilds or channels
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }

    if (msg.content === '/channelid') {
        msg.reply(msg.channel.id);
    }
});

// Start listening discord users messages:
export function startPolling() {
    client.login(DISCORD_BOT_TOKEN);
}
