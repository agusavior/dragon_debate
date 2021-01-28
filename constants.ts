import { CollectionInsertOneOptions } from "mongodb";
import privatekeys from './privatekeys'

// Ports:
export const NEXT_SERVER_PORT = 8085;
export const CONTENT_SERVER_PORT = 2200;
export const DISCORD_BOT_SERVER_PORT = 2201;

// ¿Is Dev?
export const IS_DEV: boolean = process.env.NODE_ENV !== 'production'

// Urls:
export const APP_URL = IS_DEV ? `http://localhost:${NEXT_SERVER_PORT}` : 'https://agusor.net'
export const API_URL = IS_DEV ? `http://localhost:${NEXT_SERVER_PORT}/api` : 'https://agusor.net/api'
export const STATIC_PUBLIC_URL = IS_DEV ? `http://localhost:${NEXT_SERVER_PORT}` : 'https://agusor.net'
export const CONTENT_URL = IS_DEV ? `http://localhost:${CONTENT_SERVER_PORT}` : 'https://agusor.net/content'
export const DISCORD_BOT_URL = `http://localhost:${DISCORD_BOT_SERVER_PORT}`

// Not Secures Urls:
export const NO_SECURE_STATIC_PUBLIC_URL = IS_DEV ? STATIC_PUBLIC_URL : 'http://agusor.net'
export const NO_SECURE_CONTENT_URL = IS_DEV ? CONTENT_URL : `http://agusor.net/content`

// Auth Token Options
export const AUTH_SECRET_KEY = privatekeys.AUTH_SECRET_KEY;
export const AUTH_EXPIRE_TIME = '4800h';

export const DB_NAME = 'test';
export const DB_USERNAME = 'agusavior';
export const DB_PASSWORD = privatekeys.DB_PASSWORD;

export const MONGO_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@agusaviorcluster-nfoij.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

export const INSERT_ONE_OPTIONS: CollectionInsertOneOptions = {
    w: 'majority',
    wtimeout: 10000,
    serializeFunctions: true,
    forceServerObjectId: true
}

export const DISCORD_BOT_TOKEN = privatekeys.DISCORD_BOT_TOKEN;