const request = require('request');

class ChorusAPI {
    constructor() {
        this.URL = 'http://chorus.fightthe.pw/';
        this.TYPE =  {
            SEARCH: 'api/search?',
            RANDOM: 'api/random',
            COUNT: 'api/count'
        }
    }

    search(type, query, resultCount) {
        if (isNaN(resultCount)) throw new Error('You must input your resultCount as an integer');
        let results = {};
        let url = this.URL;
        url += this.TYPE.SEARCH + 'query=' + type + '=' + query;
        request.get(url, (err, req, body) => {
            if (err) throw err;
            for (let i = 0; i < resultCount; i++) {
                results[resultCount] = {
                    songName: body.songs[resultCount].name
                }
            }
        });

        return results;
    }
}

module.exports = ChorusAPI;