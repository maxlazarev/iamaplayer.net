var express         = require('express');
var path            = require('path');
var errorHandler    = require('errorhandler');
var routes          = require('./routes');
var morgan          = require('morgan');

/**
 * Configures application
 *
 * @param app
 * @returns {*}
 */
module.exports = function(app) {
    app.set('port', process.env.PORT || 3300);
    app.use('/public', express.static(path.join(__dirname, '../public')));
    routes.initialize(app);
    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }

    return app;
};