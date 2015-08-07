var express = require('express');

module.exports = function(app) {
    app.use('/public', express.static(path.join(__dirname, '../public')));
    return app;
};