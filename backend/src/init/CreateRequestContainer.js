class CreateRequestContainer {
    onRequest = (request, h) => {
        const requestContainer = require('../container').container.createChild();
        request.app.requestContainer = requestContainer;
        return h.continue;
    }
}

module.exports.CreateRequestContainer = CreateRequestContainer;
