const axios = require('axios');
const channelAccessToken = require('./channelAccessToken');

const lineApi = {
  parseMessage: function(message) {
    if (message[0] !== '@') {
      return false;
    }
    
    let pieces = message.split(' ');
    let hash = pieces[0].substr(1);
    let args = pieces.slice();
    
    args.shift();
    
    return {
      hash,
      args
    };
  },
  reply: function(replyToken, messages) {
    channelAccessToken.get()
      .then(token => ({
        method: 'post',
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: {
          'Content-type' : 'application/json',
          'Authorization' : 'Bearer ' + token
        },
        data: {
          replyToken,
          messages
        }
      }))
      .then(axios)
      .then(function() {
        console.log(`[[ SEND REPLY - ${replyToken} ]]`)
      })
      .catch(function() {
        console.log('[[ REPLY ERROR ]]')
      });
  },
  leaveRoom: function(roomId) {
    channelAccessToken.get()
      .then(token => ({
        method: 'post',
        url: `https://api.line.me/v2/bot/room/${roomId}/leave`,
        headers: {
          'Authorization' : 'Bearer ' + token
        }
      }))
      .then(axios)
      .then(function() {
        console.log(`[[ LEAVE ROOM - ${roomId} ]]`);
      })
      .catch(function() {
        console.log('[[ LEAVE ROOM ERROR ]]');
      });
  }
};

module.exports = lineApi;