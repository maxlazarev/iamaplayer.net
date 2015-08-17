var express         = require('express');
var path            = require('path');
var errorHandler    = require('errorhandler');
var routes          = require('./routes');
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var cors            = require('../middlewares/cors.js');

/**
 * Configures application
 *
 * @param app
 * @returns {*}
 */
module.exports = function(app) {

    app.set('port', process.env.PORT || 3300);

    // Setting up the routes
    routes.initialize(app);

    // Setting up middlewares
    app.use(logger('dev'));
    app.use('/public', express.static(path.join(__dirname, '../public')));
    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }
    app.use(bodyParser.json);

    app.all('/*', function(req, res, next) {
        cors(req, res).then(function() {
            next();
        })
        .catch(res.json)
        .done();
    });

    return app;
};