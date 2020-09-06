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

        // livroDao.index(function(err, result) {

        //     response.marko(
        //         require('../views/books/lista/lista.marko'), {
        //             livros: result
        //         }
        //     );
        // });
    });
}