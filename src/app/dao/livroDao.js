class LivroDao {
    constructor(db) {
        this._db = db;
    }

    index() {

        return new Promise((resolve, reject) => {

            this._db.all(
                'SELECT * FROM livros',
                (err, results) => {
                    if (err) return reject('Não foi possível listar os livros!');

                    return resolve(results);
                }
            )
        });
    }

    create(livro) {

        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO livros (
                    titulo,
                    preco,
                    descricao
                ) values (?,?,?)
            `, [
                livro.titulo,
                livro.preco,
                livro.descricao
            ], function(err) {
                if (err) {
                    console.log(err);
                    return reject('Não foi possível adicionar o livro');
                }
                resolve();
            });
        })
    }

    searchForId(id) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM livros
                    WHERE id = ?
                `, [id],
                (err, livro) => {
                    if (err) {
                        return reject('Não foi possível encontrar o livro!');
                    }
                    return resolve(livro);
                }
            );
        });
    }

    update(livro) {

        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE livros SET
                titulo = ?,
                preco = ?,
                descricao = ?
                WHERE id = ?
            `, [
                    livro.titulo,
                    livro.preco,
                    livro.descricao,
                    livro.id
                ],
                erro => {
                    if (erro) {
                        return reject('Não foi possível atualizar o livro!');
                    }

                    resolve();
                });
        });
    }
}

module.exports = LivroDao;