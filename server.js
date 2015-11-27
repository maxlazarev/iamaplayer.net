var express     = require('express');
var config      = require('./server/configure');
var mongoose    = require('mongoose');

var app;

app = express();
app = config(app);

/*mongoose.connect('mongodb://localhost/iamaplayer');
mongoose.connection.on('open', function() {
    console.log('Mongoose connected');
});*/

app.listen(app.get('port'), function(err) {
    if (err) {
        throw err;
    }
    console.log('Server is up at http://localhost:' + app.get('port'));
});
