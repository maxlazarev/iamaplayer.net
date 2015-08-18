var Q = require('q');

module.exports = function(req, res) {
    var deffered = Q.defer();
    // CORS headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Custom headers for CORS
    res.header('Access-Control-Allow-Headers',
        'Content-type,Accept,X-Access-Token,X-Key');

    deffered.resolve(res);

    return deffered.promise;
};
