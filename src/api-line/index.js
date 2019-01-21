const axios = require('axios');
const channelAccessToken = require('./channelAccessToken');

const lineApi = {
  reply: function(replyToken, replies) {
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
          messages: replies
        }
      }))
      .then(request => {
        axios(request)
          .then(function() {
            console.log(`[[ SEND REPLY - ${replyToken} ]]`)
          })
          .catch(function() {
            console.log('[[ REPLY ERROR ]]')
          });
      })
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
      .then(request => {
        axios(request)
          .then(function() {
            console.log(`[[ LEAVE ROOM - ${roomId} ]]`);
          })
          .catch(function() {
            console.log('[[ LEAVE ROOM ERROR ]]');
          });
      })
  }
};

module.exports = lineApi;