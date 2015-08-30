require('../../../constants')();
var sha1        = require('sha1');
var proxyquire  = require('proxyquire');
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

    it('should make a query', function() {
        var UserStub = {
            findOne: sinon.stub().resolves({
                email:      'diedsmiling@gmail.com',
                password:   sha1('123')
            })
        };

        auth = proxyquire('../../../routes/auth', {
            '../models/user':   UserStub
        });

        auth.login(req, res);

        expect(UserStub.findOne).to.be.calledWith({
            email:      'valid@email.io',
            password:   sha1('password')
        });
    });

    it('should set token if user was found', function(done) {
        var UserStub = {
            findOne: sinon.stub().resolves({
                email:      'diedsmiling@gmail.com',
                password:   sha1('123')
            })
        };
        var jwtHelperStub = {
            genToken:   sinon.spy()
        };

        auth = proxyquire('../../../routes/auth', {
            '../models/user':       UserStub,
            '../helpers/jwtToken':  jwtHelperStub
        });

        auth.login(req, res);
        return UserStub.findOne().then(function() {
            expect(jwtHelperStub.genToken).to.be.called;
            expect(res.json).to.be.called;
            done();
        });
    });


    //TODO needs refactor
});
