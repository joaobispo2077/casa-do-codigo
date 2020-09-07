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

    app.get('/livros/form/:id', function(req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.searchForId(id)
            .then(livro =>
                resp.marko(
                    require('../views/books/livros/form/form.marko'), {
                        livro: livro
                    }
                )
            )
            .catch(erro => console.log(erro));

    });


    app.post('/livros', [
        check('titulo').isLength({ min: 4 }).withMessage('O título deve possuir no mínimo 4 caracteres'),
        check('preco').isCurrency().withMessage('O preço precisa ter um valor monetário válido')
    ], function(request, response) {
        console.log(request.body);

        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.marko(
                require('../views/books/livros/form/form.marko'), {
                    livro: request.body,
                    errosValidacao: errors.array()
                }
            );
        }

        const livroDao = new LivroDao(db);
        livroDao.create(request.body)
            .then(response.redirect('/livros'))
            .catch(err => console.log(err));
    })

    app.put('/livros', function(request, response) {
        console.log(request.body);

        const livroDao = new LivroDao(db);
        livroDao.update(request.body)
            .then(response.redirect('/livros'))
            .catch(err => console.log(err));
    })

    app.delete('/livros/:id', function(request, response) {
        const id = request.params.id;

        const livroDao = new LivroDao(db);
        livroDao.remove(id)
            .then(() => response.status(200).end())
            .catch(err => console.log(err));
    });
}