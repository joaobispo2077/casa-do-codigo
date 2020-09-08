const db = require('../../config/database');

const LivroController = require('../controllers/LivroController');
const livroController = new LivroController(db);

const BaseController = require('../controllers/BaseController');
const baseController = new BaseController();

const Livro = require('../models/livro');

module.exports = (app) => {
    const baseRoutes = BaseController.routes();
    const bookRoutes = LivroController.routes();

    app.get(baseRoutes.home, baseController.default());

    app.get(bookRoutes.index, livroController.index());

    app.get(bookRoutes.create, function(request, response) {
        response.marko(require('../views/books/livros/form/form.marko'), { livro: {} });
    });

    app.get(bookRoutes.update, livroController.show());


    app.post(bookRoutes.create, Livro.validations(), livroController.create());

    app.put(bookRoutes.create, livroController.update())

    app.delete(bookRoutes.delete, livroController.delete());
}