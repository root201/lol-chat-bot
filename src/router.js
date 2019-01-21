const router = require('express').Router();
const lineApi = require('./lineApi');
const createReply = require('./createReply');

router.get('/webhook', function(req, res) {
  res.status(200).set('Content-Type', 'text/html');
  res.send('<h1>LOL Chat Bot - Hook Server</h1><p>primrose201@naver.com</p>')
});

router.post('/webhook', function(req, res) {
  const events = req.body.events;

  if (events && Array.isArray(events)) {
    Promise.all(events.map(event => createReply(event)))
      .then(replies => replies.filter(reply => reply !== null))
      .then(replies => {
        lineApi.reply(events[0].replyToken, replies);
      });
  }
  
  res.sendStatus(200);
});

module.exports = router;
