const baseRoutes = require('./baseRoutes');
const bookRoutes = require('./bookRoutes');
module.exports = (app) => {
    baseRoutes(app);
    bookRoutes(app);
}