require('marko/node-require').install();
require('marko/express');

const express = require('express');
const app = express();

const templates = require('../app/views/templates');

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use('/static', express.static('src/app/public'));

const sessionAuth = require('./sessionAuth');
sessionAuth(app);

app.use(bodyParser.urlencoded({
    extended: true, //config: receiving complex objects in JSON format
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function(request, response) {
    if (request.body && typeof request.body === 'object' && '_method' in request.body) {
        //reminder: look in urlencoded POST bodies and delete it
        var method = request.body._method;
        delete request.body._method;
        return method;
    }
}));

const routes = require('../app/routes/routes');
routes(app);

app.use((request, response, next) => response
    .status(404)
    .marko(
        templates.base.error404
    ));

app.use((err, request, response, next) => {
    console.log(err);
    response
        .status(500)
        .marko(
            templates.base.error500
        )
});

module.exports = app;