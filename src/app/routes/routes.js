const { check, validationResult } = require('express-validator/check');

const LivroDao = require('../dao/LivroDao');
const db = require('../../config/database');

const LivroController = require('../controllers/LivroController');
const livroController = new LivroController(db);

module.exports = (app) => {



    app.get('/', function(request, response) {
        response.marko(require('../views/books/base/home/home.marko'));
    });

    app.get('/livros', livroController.index());

    app.get('/livros/form', function(request, response) {
        response.marko(require('../views/books/livros/form/form.marko'), { livro: {} });
    });

    app.get('/livros/form/:id', livroController.show());


    app.post('/livros', [
        check('titulo').isLength({ min: 4 }).withMessage('O título deve possuir no mínimo 4 caracteres'),
        check('preco').isCurrency().withMessage('O preço precisa ter um valor monetário válido')
    ], livroController.create());

    app.put('/livros', livroController.update())

    app.delete('/livros/:id', livroController.delete());
}