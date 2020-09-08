const BaseController = require('../controllers/BaseController');
const baseController = new BaseController();

module.exports = (app) => {
    const baseRoutes = BaseController.routes();

    app.get(baseRoutes.home, baseController.default());


}