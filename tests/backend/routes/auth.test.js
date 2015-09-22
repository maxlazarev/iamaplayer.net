var sha1        = require('sha1');
var proxyquire  = require('proxyquire');
var validator   = require('validator');
var auth;
var res;
var req;
var UserStub;

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

    describe('Validates requested data', function() {
        beforeEach(function() {
            auth = require('../../../routes/auth');
        });

        it('should handle 401 request with empty credentials', function() {
            req.body.password = '';
            req.body.email = '';

            auth.login(req, res);

            expect(res.status).to.be.calledWith(401);
            expect(res.json).to.be.calledWith({
                error:      0,
                status:     401,
                message:    'Empty credentials'
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
                error:      1,
                status:     401,
                message:    'Invalid email address'
            });
        });
    });

    describe('Authentication', function() {
        beforeEach(function() {
            UserStub = {
                findOne: sinon.stub().resolves({
                    email:      'diedsmiling@gmail.com',
                    password:   sha1('123')
                })
            };
        });

        it('should make a query', function() {
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
            var jwtHelperStub = {
                genToken:   sinon.stub().returns({
                    key: 'value'
                })
            };

            auth = proxyquire('../../../routes/auth', {
                '../models/user':       UserStub,
                '../helpers/jwtToken':  jwtHelperStub
            });

            auth.login(req, res);

            return UserStub.findOne().then(function() {
                expect(jwtHelperStub.genToken).to.be.called;
                expect(res.json).to.be.calledWith({
                    key: 'value'
                });
                done();
            });
        });
    });

    describe('Authentication failure', function() {
        it('should handle 500 if query failed', function(done) {
            var UserStub = {
                findOne: sinon.stub().rejects({
                    message: 'Query failed!'
                })
            };

            auth = proxyquire('../../../routes/auth', {
                '../models/user':   UserStub
            });

            auth.login(req, res);

            return UserStub.findOne().catch(function() {
                expect(res.status).to.be.calledWith(500);
                expect(res.json).to.be.calledWith(sinon.match.object);
                done();
            });
        });

        it('should handle 401 if use wasn`t found', function(done) {
            var UserStub = {
                findOne: sinon.stub().resolves(null)
            };

            auth = proxyquire('../../../routes/auth', {
                '../models/user':       UserStub
            });

            auth.login(req, res);

            return UserStub.findOne().then(function() {
                expect(res.status).to.be.calledWith(401);
                expect(res.json).to.be.calledWith({
                    error:      2,
                    status:     401,
                    message:    'Invalid credentials'
                });
                done();
            });
        });
    });

});
