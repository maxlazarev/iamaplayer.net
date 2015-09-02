var paths = require('../server/paths');
var auth  = require('./auth');
var constants = require('../constants');

/**
 * Sets the routes
 *
 * @param {obj} app
 */
module.exports.initialize = function(app) {
    /*
     * Pass routing to angular app
     */
    app.get('*', function(req, res) {
        res.sendFile(constants.DR + '/' + paths.front.indexDist);
    });

    app.get('/admin', function(req, res) {
        res.sendFile(constants.DR + '/' + paths.admin.indexDist);
    });

    app.get('/admin/*', function(req, res) {
        res.sendFile(constants.DR + '/' + paths.admin.indexDist);
    });

    /**
     *  Login route
     */
    app.post('/login', auth.login);
};
