function createUrlQuery(url, params) {
  params = params || {};

  return Object.keys(params).reduce((accum, key, i) => {
    accum += i === 0 ? '?' : '&';
    accum += `${key}=${encodeURIComponent(params[key])}`;

    return accum;
  }, url);
}

function formatDate(timestamp, format) {
  const dateObj = new Date(timestamp);
  const dayMap = ['일', '월', '화', '수', '목', '금', '토'];
  
  dateObj.setHours(dateObj.getHours() + 9);
  
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let date = dateObj.getDate();
  let day = dayMap[dateObj.getDay()];
  let hour = dateObj.getHours();
  let min = dateObj.getMinutes();

  const result = format
    .replace('year', year)
    .replace('month', month)
    .replace('date', date)
    .replace('day', day)
    .replace('hour', toTwoDigit(hour))
    .replace('min', toTwoDigit(min));

  return result;
}

function toTwoDigit(num) {
  let str = num.toString();

  if (str.length === 1) {
    str = '0' + str;
  }

  return str;
}

module.exports = {
  createUrlQuery,
  formatDate
}
