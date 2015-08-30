require('../../../constants')();
var validator   = require('validator');
var auth;
var res;
var req;

describe('Auth', function() {

    beforeEach(function() {
        res = {
            status: sinon.spy(),
            json:    sinon.spy()
        };
        req = {
            body: {
                password:   'password',
                email:      'valid@email.io'
            }
        };
    });

    describe('Should validate requested data', function() {
        beforeEach(function() {
            auth = require('../../../routes/auth');
        });

        it('should handle 401 request with empty credentials', function() {
            req.body.password = '';
            req.body.email = '';

            auth.login(req, res);
            expect(res.status).to.be.calledWith(401);
            expect(res.json).to.be.calledWith({
                status:     401,
                message:    'Invalid credentials'
            });
        });

        it('should validate email', function() {
            validator.isEmail = sinon.spy();
            auth.login(req, res);
            expect(validator.isEmail).to.be.calledWith(sinon.match.string);
        });

        it('should handle 401 request with invalid email', function() {
            req.body.email = 'invalid email';
            auth.login(req, res);
            expect(res.status).to.be.calledWith(401);
            expect(res.json).to.be.calledWith({
                status:     401,
                message:    'Invalid email address'
            });
        });
    });
});
