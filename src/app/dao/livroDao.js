class LivroDao {
    constructor(db) {
        this._db = db;
    }

    index(callback) {
        this._db.all(
            'SELECT * FROM livros',
            (err, results) => callback(err, results)
        )
    }
}

module.exports = LivroDao;