import express from 'express'
import { secretGeneralChannel } from './channels'

var router = express.Router();

export const videoURL = 'videoURL'

// define the home page route
router.post('/publishVideo', function(req, res) {
    secretGeneralChannel().send(req.body[videoURL])
    res.send('Ok');
});

export default router;