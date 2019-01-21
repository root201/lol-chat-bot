const utils = require('../utils');

const writer = {
  writeLOLAddictionCheck({ nickname, status, spectator, match }) {
    if (status !== 200) {
      return `"${nickname}"에 대한 정보 없음`;
    }
    
    const messages = [`"${nickname}"에 대한 정보`];
    
    if (spectator) {
      messages.push('[ 인게임 정보 ]');
      if (spectator.status === 200) {
        messages.push('· 게임중 : O');
      } else {
        messages.push('· 게임중 : X');
      }
    }
    
    if (match) {
      const recentMatch = match.data.matches[0];
      
      messages.push('[ 최근 전적 ]');
      messages.push(`· 시간 : ${utils.formatDate(recentMatch.timestamp, 'year-month-date (day) hour:min')}`)
    }
    
    return {
      type: 'text',
      text: messages.join('\n')
    }
  }
};

module.exports = writer;
