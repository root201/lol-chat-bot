const dom = require('./createReplyDOM');
const utils = require('../utils');
const champions = require('../static/champions.js');

function createReply_lolAddictionCheck(data) {
  const { nickname, status, spectator, match } = data;

  if (status !== 200) {
    return dom.createTextElement({
      text: `"${nickname}"에 대한 정보 없음`
    });
  }

  const altText = `"@롤중독자 ${nickname}"의 결과`;
  const _nickname = utils.removeWhitespace(nickname);
  const firstBubble = dom.createBubbleElement({
    header: dom.createBoxElement({
      contents: [
        dom.createTextElement({
          text: nickname,
          size: 'xl',
          align: 'center'
        })
      ]
    }),
    body: dom.createBoxElement({
      flex: 1,
      spacing: 'lg'
    }),
    footer: dom.createBoxElement({
      contents: [
        dom.createSpacerElement(),
        dom.createLinkElement({
          label: 'OP.GG에서 찾기',
          uri: 'http://www.op.gg/summoner/userName=' + encodeURIComponent(nickname),
          style: 'primary',
          color: '#5383E8'
        })
      ]
    }),
    styles: {
      body: {
        separator: true,
        separatorColor: '#DADADA'
      },
      footer: {
        separator: true,
        separatorColor: '#DADADA'
      }
    }
  });
  const secondBubble = dom.createBubbleElement({
    header: dom.createBoxElement({
      contents: [
        dom.createTextElement({
          text: '최근 전적',
          size: 'xl',
          align: 'center',
          color: '#4A72C7'
        })
      ]
    }),
    body: dom.createBoxElement({
      flex: 1,
      spacing: 'lg'
    }),
    styles: {
      body: {
        separator: true,
        separatorColor: '#DADADA'
      }
    }
  });

  if (spectator && spectator.status === 200) {
    const myInfo = spectator.data.participants.find(participant => {
      return utils.removeWhitespace(participant.summonerName) === _nickname;
    });

    firstBubble.body.contents.push(dom.createImageElement({
      url: `https://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${champions[myInfo.championId].name}.png`
    }));
    firstBubble.body.contents.push(dom.createTextElement({
      text: `게임 중 (시작시간: ${utils.formatDate(spectator.data.gameStartTime, 'day요일 hour:min')})`,
      size: 'md',
      align: 'center',
      color: '#777777'
    }));
  } else {
    firstBubble.body.contents.push(dom.createTextElement({
      text: '게임 중이 아닙니다',
      size: 'md',
      align: 'center',
      color: '#777777'
    }));
  }

  if (match && match.status === 200) {
    const recentMatch = match.data.matches[0];

    secondBubble.body.contents.push(createDefinitionBoxElement({
      title: '가장 최근에 게임한 시간',
      text: `${utils.formatDate(recentMatch.timestamp, 'year-month-date (day) hour:min')}`
    }));
  }

  const wrapper = dom.createFlexElement({
    contents: dom.createCarouselElement({
      contents: [
        firstBubble,
        secondBubble
      ]
    })
  });
  wrapper.altText = altText;

  return wrapper;
}

function createDefinitionBoxElement({ 
  title,
  text 
}) {
  const box = dom.createBoxElement({
    spacing: 'xs'
  });

  box.contents.push(dom.createTextElement({
    text: title,
    size: 'md',
    weight: 'bold'
  }));
  box.contents.push(dom.createTextElement({
    text: text,
    size: 'sm',
    color: '#777777'
  }));

  return box;
}

module.exports = createReply_lolAddictionCheck;
