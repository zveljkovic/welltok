const randomQuotes = require('random-quotes');
const {AppConfig} = require('../helpers/AppConfig');

class HomeService {
    async home() {
        const quote = randomQuotes.default();
        return {
            status: 'OK',
            config: AppConfig.DbConfig,
            quote: quote.body.replace('"', '\'') + ' - ' + quote.author,
        };
    }
}

module.exports.HomeService = HomeService;
