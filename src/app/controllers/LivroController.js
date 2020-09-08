const { check, validationResult } = require('express-validator/check');

const LivroDao = require('../dao/LivroDao');
const db = require('../../config/database');

const templates = require('../views/templates');

class LivroController {

    static routes() {
        return {
            index: '/livros',
            create: '/livros/form',
            update: '/livros/form/:id',
            delete: '/livros/:id'
        }
    }

    index() {
        return function(request, response) {

            const livroDao = new LivroDao(db);
            livroDao.index()
                .then(livros =>
                    response.marko(
                        templates.books.index, {
                            livros: livros
                        }))
                .catch(err => console.log(err));
        }
    }

    show() {
        return function(req, resp) {
            const id = req.params.id;
            const livroDao = new LivroDao(db);

            livroDao.searchForId(id)
                .then(livro =>
                    resp.marko(
                        templates.books.form, {
                            livro: livro
                        }
                    )
                )
                .catch(erro => console.log(erro));

        }
    }

    formIndex() {
        return function(request, response) {
            response.marko(templates.books.form, { livro: {} });
        }
    }


    create() {
        return function(request, response) {
            console.log(request.body);

            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                return response.marko(
                    require(`${routes().template}form/form.marko`), {
                        livro: request.body,
                        errosValidacao: errors.array()
                    }
                );
            }

            const livroDao = new LivroDao(db);
            livroDao.create(request.body)
                .then(response.redirect(LivroController.routes().index))
                .catch(err => console.log(err));
        }
    }

    update() {
        return function(request, response) {
            console.log(request.body);

            const livroDao = new LivroDao(db);
            livroDao.update(request.body)
                .then(response.redirect(LivroController.routes().index))
                .catch(err => console.log(err));
        }
    }

    delete() {
        return function(request, response) {
            const id = request.params.id;

            const livroDao = new LivroDao(db);
            livroDao.remove(id)
                .then(() => response.status(200).end())
                .catch(err => console.log(err));
        }
    }
}

module.exports = LivroController;