const _ = require('lodash');
const utils = require('../utils');
const champions = require('../constants/champions');

const writer = {
  writeLOLAddictionCheck({ nickname, status, spectator, match }) {
    if (status !== 200) {
      return {
        type: 'text',
        text: nickname + '에 대한 정보없음'
      };
    }

    const altText = `@롤중독자 ${nickname} 의 결과`
    const _nickname = utils.removeWhitespace(nickname);
    const cards = [];
    let firstCard = null;

    if (spectator && spectator.status === 200) {
      const mine = spectator.data.participants.find(participant => utils.removeWhitespace(participant.summonerName) === _nickname);

      firstCard = createCard({
        header: createHeader({
          text: nickname
        }),
        body: createBody([
          {
            type: 'image',
            url: `https://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${champions[mine.championId].name}.png`
          },
          {
            type: 'text',
            text: `${utils.formatDate(spectator.data.gameStartTime, 'day요일 hour:min')}에 게임 시작`
          }
        ]),
        footer: createFooter([
          {
            type: 'spacer',
            size: 'xs'
          },
          {
            type: 'button',
            action: {
              type: 'uri',
              label: 'OP.GG에서 찾기',
              uri: 'http://www.op.gg/summoner/userName=' + encodeURIComponent(nickname)
            },
            color: '#5383E8',
            style: 'primary'
          }
        ])
      });
    } else {
      firstCard = createCard({
        header: createHeader({
          text: nickname
        }),
        body: createBody([
          {
            type: 'text',
            text: '게임중이 아닙니다.'
          }
        ]),
        footer: createFooter([
          {
            type: 'spacer',
            size: 'xs'
          },
          {
            type: 'button',
            action: {
              type: 'uri',
              label: 'OP.GG에서 찾기',
              uri: 'http://www.op.gg/summoner/userName=' + encodeURIComponent(nickname)
            },
            color: '#5383E8',
            style: 'primary'
          }
        ])
      })
    }
    cards.push(firstCard);

    if (match && match.status === 200) {
      const recentMatch = match.data.matches[0];

      const secondCard = createCard({
        header: createHeader({
          text: '최근 전적',
          color: '#4A72C7'
        }),
        body: createBody([
          createDefinitionBox({
            title: '가장 최근에 게임한 시간',
            text: `${utils.formatDate(recentMatch.timestamp, 'year-month-date (day) hour:min')}`
          })
        ])
      });

      cards.push(secondCard);
    }

    return {
      type: 'flex',
      altText,
      contents: {
        type: 'carousel',
        contents: cards
      }
    };
  }
};

function createCard({ header, body, footer }) {
  return {
    type: 'bubble',
    direction: 'ltr',
    header: header || undefined,
    body: body || undefined,
    footer: footer || undefined,
    styles: {
      body: {
        separator: true,
        separatorColor: '#DADADA'
      },
      footer: footer ? {
        separator: true,
        separatorColor: '#DADADA'
      } : undefined
    }
  };
}

function createHeader({ text, color }) {
  const header = {
    type: 'box',
    layout: 'vertical',
    contents: [{
      type: 'text',
      text,
      size: 'xl',
      align: 'center',
      color: color || '#000000'
    }]
  };

  return header;
}

function createBody(contents) {
  const body = {
    type: 'box',
    layout: 'vertical',
    flex: 1,
    spacing: 'lg'
  };

  body.contents = contents.map(
    content => (content.type === 'text' ? {
      type: 'text',
      text: content.text,
      size: 'md',
      align: 'center',
      color: '#555555'
    } : content.type === 'image' ? {
      type: 'image',
      url: content.url,
      size: 'sm',
      aspectRatio: '1:1',
      aspectMode: 'fit'
    } : content)
  );

  body.contents.push({
    type: 'spacer',
    size: 'xs'
  });

  return body;
}

function createFooter(contents) {
  const footer = {
    type: 'box',
    layout: 'vertical',
    contents
  };

  return footer;
}

function createDefinitionBox({ title, text }) {
  const box = {
    type: 'box',
    layout: 'vertical',
    spacing: 'xs',
    contents: [
      {
        type: 'text',
        text: title,
        size: 'md',
        weight: 'bold'
      },
      {
        type: 'text',
        text: text,
        size: 'sm',
        color: '#777777'
      }
    ]
  };

  return box;
}

module.exports = writer;
