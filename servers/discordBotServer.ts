import express from 'express'
import discordRouter from '../discordbot/router'
import bodyParser from 'body-parser'
import { startPolling } from '../discordbot'
import { DISCORD_BOT_SERVER_PORT } from '../constants';

const app = express();

app.use(express.json());

app.use('/', discordRouter);

app.get('/', function (_, res) {
    res.send('Discord Bot server is running :)');
});

app.listen(DISCORD_BOT_SERVER_PORT, function () {
    // Start polling
    try {
        startPolling()
    } catch(err) {
        console.log('Cant startPolling')
    }

    console.log(`> Ready Discord Bot Server on http://localhost:${DISCORD_BOT_SERVER_PORT}`);
});