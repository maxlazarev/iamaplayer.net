var jwt = require('jwt-simple');

var auth = {
    /**
     * User authentication
     *
     * @param {obj} req request headers
     * @param {obj} res response headers
     */
    login: function(req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username == '' || password == '') {
            res.status(401);
            res.json({
                status:     401,
                meassage:   'Invalid credintals'
            });
        }
    },
    validate: function() {

    }
};

module.exports = auth;
