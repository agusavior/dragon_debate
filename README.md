# dragon_debate
Personal app to discuss and manage debate audios

# First steps
Clone the project, then run "npm i".

Make a file inside the root directory of the project called 'privatekeys.ts' and fill it with this:

```
export default {
    DISCORD_BOT_TOKEN: 'discord bot token',
    AUTH_SECRET_KEY: 'some random string',
    DB_PASSWORD: 'pass of your db'
}
```

Then you can call "npm run dev" if you want to develop.

Or you just can call "npm run build" and "npm start" to launch the server.

WARNING: Up to now, you can't use "npm run start" on Windows because the problem with the syntax of setting a enviroment variable up.

If you want to use another ports, edit the file constants.ts.