class BaseController {
    static routes() {
        return {
            home: '/'
        }
    }
    default () {
        return function(request, response) {
            response.marko(require('../views/books/base/home/home.marko'));
        }
    }
}

module.exports = BaseController;