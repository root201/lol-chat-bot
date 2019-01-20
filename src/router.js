const router = require('express').Router();
const lineApi = require('./line-api');
const lolApi = require('./lol-api');
const writer = require('./writer');

router.get('/webhook', function(req, res) {
  res.status(200).set('Content-Type', 'text/html');
  res.send('<h1>LOL Chat Bot - Hook Server</h1><p>primrose201@naver.com</p>')
});

router.post('/webhook', function(req, res) {
  try {
    const e = req.body.events[0];
    const message = e.message;
    const replyToken = e.replyToken;
    
    if (message && message.type === 'text') {
      const { hash, args } = lineApi.parseMessage(message.text);

      switch (hash) {
        case '나가':
          lineApi.leaveRoom(e.source.roomId);
          break;
        case '롤중독자':
          lolApi.getByNickname(args[0])
            .then(data => writer.write(hash, data))
            .then(message => {
              if (message) {
                lineApi.reply(replyToken, [
                  { type: 'text', text: message }
                ])
              }
            });
          break;
      }
    }
  } catch (err) {
    console.error(err);
  }
  
  res.sendStatus(200);
});

module.exports = router;
