const request = require('request');

class ChorusAPI {
  constructor() {
    this.API = {
      URL: 'http://chorus.fightthe.pw/',
      SEARCH: 'api/search?',
      RANDOM: 'api/random',
      COUNT: 'api/count'
    }
  }

  search(type, query, resultCount) {
    function colon(time) {
      if (time.length == 4) {
        parts = time.match(/.{1,2}/g);
        rep = parts.join(':');
      } else if (time.length == 3) {
        time = '0' + time;
        parts = time.match(/.{1,2}/g);
        rep = parts.join(':').replace(/0/, '');
      } else if (time.length == 2 || time.length == 1 && time != '0') {
        time = '00' + time;
        parts = time.match(/.{1,2}/g);
        rep = parts.join(':');
      } else {
        rep = 'Something went wrong!';
      }
      return rep;
    }
    if (isNaN(resultCount)) throw new Error('You must input your resultCount as an integer');
    let results = {};
    let url = this.API.URL;
    url += this.API.SEARCH + 'query=' + type + '=' + query;
    request.get(url, (err, req, body) => {
      let data = JSON.parse(body);
      if (err) throw err;
      for (let i = 0; i < resultCount - 1; i++) {
        results[resultCount] = {
          songName: data.songs[resultCount].name,
          songArtist: data.songs[resultCount].artist,
          songCharter: data.songs[resultCount].charter,
          songYear: data.songs[resultCount].year,
          songLengths: {
            length: colon(data.songs[resultCount][8]),
            effectiveLength: colon(data.songs[resultCount].effectiveLength)
          }
        }
      }
    });

    return results;
  }
}

module.exports = ChorusAPI;

colon('0');