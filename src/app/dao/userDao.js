class UserDao {

    constructor(db) {
        this._db = db;
    }

    searchForEmail(email) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM usuarios
                    WHERE email = ?
                `, [email],
                (err, user) => {
                    if (err) {
                        return reject('Não foi possível encontrar o usuário!');
                    }

                    return resolve(user);
                }
            )
        });
    }
}

module.exports = UserDao;