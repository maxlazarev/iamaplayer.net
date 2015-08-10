var paths = require('./paths');

/**
 * Sets the routes
 *
 * @param app
 */
module.exports.initialize = function(app) {

    /*
     * Pass routing to angular app
     */
    app.get('/admin', function(req, res) {
        res.sendFile(global.DR + '/' + paths.admin.indexDist);
    });

    app.get('/admin/*', function(req, res) {
        res.sendFile(global.DR + '/' + paths.admin.indexDist);
    });

    app.get('*', function(req, res) {
        res.sendFile(global.DR + '/' + paths.front.indexDist);
    });
};