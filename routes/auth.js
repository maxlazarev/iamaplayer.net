var User        = require('../models/user');
var jwtHelper   = require('../helpers/jwtToken');
var sha1        = require('sha1');
var validator   = require('validator');
var auth        = {
    /**
     * User authentication
     *
     * @param {obj} req request headers
     * @param {obj} res response headers
     */
    login: function(req, res) {
        var email       = req.body.email || '';
        var password    = req.body.password || '';

        if (email == '' || password == '') {
            res.status(401);
            res.json({
                status:     401,
                message:    'Invalid credentials'
            });
        }

        if (!validator.isEmail(email)) {
            res.status(401);
            res.json({
                status:     401,
                message:    'Invalid email address'
            });
        }

        User.findOne({
            email: email,
            password: sha1(password)
        }).then(function(user) {
            if (user) {
                res.json(jwtHelper.genToken(user));
            } else {
                res.status(401);
                res.json({
                    status:     401,
                    message:    'Invalid email or password'
                });
            }
        }).catch(function(err) {
            res.status(500);
            res.json({
                status:     500,
                error:    err
            });
        });
    }
};

module.exports = auth;
