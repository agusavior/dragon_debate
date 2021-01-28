import { secretGuild, cuevaGuild } from './guilds'
import { TextChannel } from 'discord.js'

// Channels ids:
const SECRET_GENERAL_CHANNEL_ID = '692990168373919747'
const CUEVA_GENERAL_CHANNEL_ID = '669968218294583316'

export function secretGeneralChannel(): TextChannel {
    return secretGuild().channels.cache.get(SECRET_GENERAL_CHANNEL_ID) as TextChannel
}
