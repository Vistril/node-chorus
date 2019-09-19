const request = require('request');

class ChorusAPI {
    constructor() {
        this.URL = 'http://chorus.fightthe.pw/';
        this.search = 'api/search?';
        this.count = 'api/count';
        this.random = 'api/random';
    }

    search(type, query, resultCount = 1) {
        let results = {};
        let url = this.URL;
        url += this.search + 'query=' + type + '=' + query;
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