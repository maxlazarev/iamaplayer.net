var express =   require('express');
var config =    require('./server/configure')
var app;

app = express();

app.listen(3300, function(err) {
    console.log('Server is up');
});