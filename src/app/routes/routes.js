const LivroDao = require('../dao/LivroDao');
const db = require('../../config/database');

module.exports = (app) => {
    app.get('/', function(request, response) {
        response.marko(require('../views/books/base/home/home.marko'));
    });

    app.get('/livros', function(request, response) {

        const livroDao = new LivroDao(db);
        livroDao.index()
            .then(livros =>
                response.marko(
                    require('../views/books/livros/lista/lista.marko'), {
                        livros: livros
                    }
                ))
            .catch(err => console.log(err));
    });

    app.get('/livros/form', function(request, response) {
        response.marko(require('../views/books/livros/form/form.marko'), { livro: {} });
    });

    app.get('/livros/livros/form/:id', function(req, resp) {
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


    app.post('/livros', function(request, response) {
        console.log(request.body);

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