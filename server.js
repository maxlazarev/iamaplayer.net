var express = require('express');
var config  = require('./server/configure');
require('./constants')();
var app;

app = express();
app = config(app);

app.listen(app.get('port'), function(err) {
    if (err) {
        throw err;
    }
    console.log('Server is up at http://localhost:' + app.get('port'));
});