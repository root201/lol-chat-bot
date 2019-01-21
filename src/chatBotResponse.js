const lineApi = require('./api-line');
const lolApi = require('./api-lol');
const writer = require('./writer');

function chatBotResponse(event) {
  if (!event.message || event.message.type !== 'text') {
    return null;
  }

  try {
    const replyToken = event.replyToken;
    const { hash, args } = parseMessageText(event.message.text);

    switch(hash) {
      case '나가':
        lineApi.leaveRoom(event.source.roomId);
        break;
      case '롤중독자':
        lolApi.getByNickname(args[0])
          .then(data => writer.writeLOLAddictionCheck(data))
          .then(message => message && lineApi.reply(replyToken, [ { type: 'text', text: message } ]));
        break;
    }

  } catch (error) {
    console.error(error);
  }
}

function parseMessageText(messageText) {
  if (messageText[0] !== '@') {
    return null;
  }
  
  let args = message.split(' ');
  let hash = args[0].substr(1);
  
  args.shift();
  
  return { hash, args };
}

module.exports = chatBotResponse;
