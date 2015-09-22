var express         = require('express');
var path            = require('path');
var errorHandler    = require('errorhandler');
var routes          = require('../routes');
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser')
var csrf            = require('csurf');
var cors            = require('../middlewares/cors');

/**
 * Configures application
 *
 * @param {obj} app
 * @returns {*}
 */
module.exports = function(app) {
    app.set('port', process.env.PORT || 3300);

    // Setting up middlewares
    app.use(logger('dev'));
    // Parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));
    // Body-parser middleware
    app.use(bodyParser.json());
    // Cookies
    app.use(cookieParser());

    var csrfProtection = csrf({ cookie: true });

    // CSRF protection middleware
    app.use(csrfProtection);

    app.use('/public', express.static(path.join(__dirname, '../public')));
    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }

    app.all('/*', function(req, res, next) {
        cors(req, res).then(function() {
            next();
        })
        .catch(res.json)
        .done();
    });

    // Setting up the routes
    routes.initialize(app);

    return app;
};
