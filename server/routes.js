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
        res.sendFile('./public/index.html');
    });

    app.get('/admin/*', function(req, res) {
        res.sendFile('./public/admin/index.html');
    });

};