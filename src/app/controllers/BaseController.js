const templates = require('../views/templates');

class BaseController {
    static routes() {
        return {
            home: '/'
        }
    }
    default () {
        return function(request, response) {
            response.marko(templates.base.home);
        }
    }
}

module.exports = BaseController;