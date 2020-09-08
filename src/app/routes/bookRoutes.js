const db = require('../../config/database');

const LivroController = require('../controllers/LivroController');
const livroController = new LivroController(db);

const Livro = require('../models/livro');
const BaseController = require('../controllers/BaseController');

module.exports = (app) => {
    const bookRoutes = LivroController.routes();

    app.use(bookRoutes.authenticate, function(request, response, next) {
        if (request.isAuthenticated()) {
            next();
        } else {
            response.redirect(BaseController.routes().login)
        }
    })

    app.get(bookRoutes.index, livroController.index());

    app.get(bookRoutes.update, livroController.show());

    app.route(bookRoutes.create)
        .get(livroController.formIndex())
        .post(Livro.validations(), livroController.create())
        .put(livroController.update());

    app.delete(bookRoutes.delete, livroController.delete());
}