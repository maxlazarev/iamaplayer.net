var Q = require('q');

module.exports = function(req, res) {
    var deffered = Q.defer();

    return deffered.promise;
};
