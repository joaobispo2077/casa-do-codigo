const LivroDao = require('../dao/LivroDao');
const db = require('../../config/database');

module.exports = (app) => {
    app.get('/', function(request, response) {
        response.send(`
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1> Hello World </h1>
                </body> 
            </html>
        `);
    });

    app.get('/livros', function(request, response) {

        const livroDao = new LivroDao(db);
        livroDao.index()
            .then(livros =>
                response.marko(
                    require('../views/books/lista/lista.marko'), {
                        livros: livros
                    }
                ))
            .catch(err => console.log(err));
    });

    app.get('/livros/form', function(request, response) {
        response.marko(require('../views/books/form/form.marko'));
    });


    app.post('/livros', function(request, response) {
        console.log(request.body);

        const livroDao = new LivroDao(db);
        livroDao.create(request.body)
            .then(response.redirect('/livros'))
            .catch(err => console.log(err));
    })

    app.delete('/livros/:id', function(request, response) {
        const id = request.params.id;

        const livroDao = new LivroDao(db);
        livroDao.remove(id)
            .then(() => response.status(200).end())
            .catch(err => console.log(err));
    })
}