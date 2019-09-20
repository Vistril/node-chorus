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

  search(type, query) {
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
    //if (isNaN(resultCount)) throw new Error('You must input your resultCount as an integer');
    let results = [];
    //let url = this.API.URL;
    let url = 'http://chorus.fightthe.pw/api/search?query=' + type + '=' + query
    request.get(url, (err, req, body) => {
      let data = JSON.parse(body);
      if (err) throw err;
      let i = 0;
      //for (let i = 0; i < 5; i++) {
        results[i] = {
          songName: data.songs[i].name,
          songArtist: data.songs[i].artist,
          songCharter: data.songs[i].charter,
          songYear: data.songs[i].year,
          songLengths: {
            length: colon(data.songs[i][8]),
            effectiveLength: colon(data.songs[i].effectiveLength)
          }
        }
      //}
    });

    return results;
  }
}

module.exports = ChorusAPI;
