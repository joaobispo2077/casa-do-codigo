const templates = require('../views/templates');

class BaseController {
    static routes() {
        return {
            home: '/',
            login: '/login'
        }
    }

    default () {
        return function(request, response) {
            response.marko(templates.base.home);
        }
    }

    login() {
        return function(request, response) {
            response.marko(templates.base.login);
        }
    }

    handleLogin() {
        return function(request, response) {
            // logic
        }
    }
}

module.exports = BaseController;