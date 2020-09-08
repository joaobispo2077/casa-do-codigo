const templates = require('../views/templates');
const passport = require('passport');
const LivroController = require('./LivroController');

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
        return function(request, response, next) {
            const passport = request.passport;
            passport.authenticate('local', function(err, usuario, info) {
                if (info) {
                    return response.marko(templates.base.login);
                }

                if (err) {
                    return next(err);
                }

                request.login(usuario, (err) => {
                    if (err) {
                        return next(err);
                    }

                    return response.redirect(LivroController.routes().index);
                });
            })(request, response, next);
        }
    }
}
module.exports = BaseController;