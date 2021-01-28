import { client } from '.'

const SECRET_GUILD_ID = '692990168373919744'
const CUEVA_GUILD_ID = '669960865469956107'

export function secretGuild() {
    return client.guilds.cache.get(SECRET_GUILD_ID)
}

export function cuevaGuild() {
    return client.guilds.cache.get(CUEVA_GUILD_ID)
}
