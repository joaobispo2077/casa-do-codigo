const uuid = require('uuid/v4');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserDao = require('../app/dao/userDao');
const db = require('./database');

module.exports = (app) => {

    passport.use(new LocalStrategy({ // strategy local of auth
            usernameField: 'email',
            passwordField: 'senha'
        },
        (email, senha, done) => {
            const userDao = new UserDao(db);
            userDao.searchForEmail(email)
                .then(user => {
                    if (!user || senha != user.senha) {
                        return done(null, false, {
                            message: 'Login e/ou senha incorretos!'
                        })
                    }

                    return done(null, user)

                })
                .catch(err => done(err, false));
        }));

    passport.serializeUser((user, done) => {
        const sessionUser = {
            name: user.nome_completo,
            email: user.email
        };

        done(null, sessionUser);
    });

    passport.deserializeUser((sessionUser, done) => {
        done(null, sessionUser);
    });

    app.use(session({
        secret: 'musubi',
        genid: (request) => {
            return uuid(); //generator id
        },
        resave: false, //not save session 
        saveUninitialized: false // just generate session on login
    }));

    app.use(passport.initialize());
    app.use(passport.session());


    app.use(function(request, response, next) {
        request.passport = passport;
        next();
    });
};