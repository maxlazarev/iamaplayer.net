var paths = require('../server/paths');
var auth  = require('./auth');
require('../constants')();
console.log(auth);
/**
 * Sets the routes
 *
 * @param app
 */
module.exports.initialize = function(app) {
    /*
     * Pass routing to angular app
     */
    app.get('*', function(req, res) {
        res.sendFile(global.DR + '/' + paths.front.indexDist);
    });

    app.get('/admin', function(req, res) {
        res.sendFile(global.DR + '/' + paths.admin.indexDist);
    });

    app.get('/admin/*', function(req, res) {
        res.sendFile(global.DR + '/' + paths.admin.indexDist);
    });

    /**
     *  Login route
     */

    app.get('/login', auth.login);
};