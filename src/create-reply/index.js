const lineApi = require('../api-line');
const lolApi = require('../api-lol');
const writer = require('./writer');

async function createReply(event) {
  if (!event.message || event.message.type !== 'text') {
    return null;
  }

  try {
    const { hash, args } = parseMessageText(event.message.text);

    switch(hash) {
      case '나가':
        await lineApi.leaveRoom(event.source.roomId);
        return null;
      case '롤중독자':
        return await lolApi.getByNickname(args[0]).then(data => writer.writeLOLAddictionCheck(data));
    }
  } catch (error) {
    console.error(error);
  }

  return null;
}

function parseMessageText(messageText) {
  if (messageText[0] !== '@') {
    return null;
  }
  
  let args = messageText.split(' ');
  let hash = args[0].substr(1);
  
  args.shift();
  
  return { hash, args };
}

module.exports = createReply;
