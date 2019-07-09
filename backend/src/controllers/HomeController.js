const {HomeService} = require('../services/HomeService');

class HomeController {
    service = null;
    constructor() {
        this.service = new HomeService();
    }
    home = async (request, h) => {
        return this.service.home();
    }
}

module.exports.HomeController = HomeController;
