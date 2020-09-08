const { check, validationResult } = require('express-validator/check');

const db = require('../../config/database');

const LivroController = require('../controllers/LivroController');
const livroController = new LivroController(db);

const BaseController = require('../controllers/BaseController');
const baseController = new BaseController();

module.exports = (app) => {
    const baseRoutes = BaseController.routes();
    const bookRoutes = LivroController.routes();

    app.get(baseRoutes.home, baseController.default());

    app.get(bookRoutes.index, livroController.index());

    app.get(bookRoutes.create, function(request, response) {
        response.marko(require('../views/books/livros/form/form.marko'), { livro: {} });
    });

    app.get(bookRoutes.update, livroController.show());


    app.post(bookRoutes.create, [
        check('titulo').isLength({ min: 4 }).withMessage('O título deve possuir no mínimo 4 caracteres'),
        check('preco').isCurrency().withMessage('O preço precisa ter um valor monetário válido')
    ], livroController.create());

    app.put(bookRoutes.create, livroController.update())

    app.delete(bookRoutes.delete, livroController.delete());
}