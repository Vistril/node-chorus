const request = require('request');

class ChorusAPI {
    constructor() {
        this.API =  {
            URL: 'http://chorus.fightthe.pw/',
            SEARCH: 'api/search?',
            RANDOM: 'api/random',
            COUNT: 'api/count'
        }
    }

    search(type, query, resultCount) {
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
                        length: data.songs[resultCount].length,
                        effectiveLength: data.songs[resultCount].effectiveLength
                    }
                }
            }
        });

        return results;
    }
}

module.exports = ChorusAPI;