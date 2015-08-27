var jwt = require('jwt-simple');

var auth = {
    login: function(req, res) {
        console.log(req.body);
        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username == '' || password == '') {
            res.status(401);
            res.json({
                status:     401,
                meassage:   'Invalid credintals'
            });
        }
    }
};

module.exports = auth;
