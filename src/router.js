const router = require('express').Router();
const chatbotResponse = require('./chatbotResponse.js');

router.get('/webhook', function(req, res) {
  res.status(200).set('Content-Type', 'text/html');
  res.send('<h1>LOL Chat Bot - Hook Server</h1><p>primrose201@naver.com</p>')
});

router.post('/webhook', function(req, res) {
  if (req.body.events && Array.isArray(req.body.events)) {
    req.body.events.forEach(event => chatbotResponse(event));
  }
  
  res.sendStatus(200);
});

module.exports = router;
