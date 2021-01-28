import express from 'express'
import { CONTENT_SERVER_PORT } from '../constants';

const app = express();

app.use(express.static('content'));

app.get('/', function (req, res) {
  res.send('Content server is running :)');
});

app.listen(CONTENT_SERVER_PORT, function () {
  console.log(`> Ready Content Server on http://localhost:${CONTENT_SERVER_PORT}`);
});