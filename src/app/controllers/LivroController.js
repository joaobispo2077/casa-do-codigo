const LivroDao = require('../dao/LivroDao');
const db = require('../../config/database');

class LivroController {

    index() {
        return function(request, response) {

            const livroDao = new LivroDao(db);
            livroDao.index()
                .then(livros =>
                    response.marko(
                        require('../views/books/livros/lista/lista.marko'), {
                            livros: livros
                        }
                    ))
                .catch(err => console.log(err));
        }
    }
}

module.exports = LivroController;