const lineApi = require('../lineApi');
const lolApi = require('../lolApi');
const HASH = require('../constants/HASH');
const createReply_lolAddictionCheck = require('./lolAddictionCheck');

async function createReply(event) {
  if (!event.message || event.message.type !== 'text') {
    return null;
  }

  try {
    const { hash, args } = parseMessageText(event.message.text);

    switch(hash) {
      case HASH.LEAVE_ROOM:
        await lineApi.leaveRoom(event.source.roomId);
        return null;
      case HASH.LOL_ADDICTION_CHECK:
        return await lolApi.getByNickname(args[0]).then(data => createReply_lolAddictionCheck(data));
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
  
  return { hash, args: [ args.join(' ') ] };
}

module.exports = createReply;
