var constants   = require('../../../constants');
var jwtHelper   = require('../../../helpers/jwtToken');
var proxyquire  = require('proxyquire');
var dateTemp = Date;

describe('Jwt token helper',function() {

    describe('setExpirationDate method', function() {
        afterEach(function() {
            Date = dateTemp;
        });

        it('should create date object', function() {
            Date = sinon.stub(global, 'Date');
            Date.now = sinon.spy();
            Date.prototype.getDate = sinon.spy();
            Date.prototype.setDate = sinon.spy();

            jwtHelper.setExpirationDate(global.TOKEN_EXPIRE_DAYS);

            expect(Date).to.be.called;
            expect(Date.prototype.getDate).to.be.called;
            expect(Date.prototype.setDate).to.be.calledWith(Date.prototype.getDate() + constants.TOKEN_EXPIRE_DAYS);
        });
    });

    describe('genToken method', function() {
        it('should return object', function() {
            var userStub = {
                email: 'email@email.com'
            };
            jwtHelper.genToken = sinon.spy(jwtHelper, 'genToken');
            jwtHelper.genToken(userStub);

            expect(jwtHelper.genToken).returned({
                token:      sinon.match.string,
                expires:    sinon.match.number,
                user:       userStub
            });
        });

        it('should call setExpirationDate method', function() {
            var userStub = sinon.stub();
            jwtHelper.setExpirationDate = sinon.spy();

            jwtHelper.genToken(userStub);
            expect(jwtHelper.setExpirationDate).to.be.calledWith(constants.TOKEN_EXPIRE_DAYS);
        });

        it('should generate token', function() {
            var userStub = sinon.stub();
            var jwtStub = {
                encode: sinon.spy()
            };

            jwtHelper = proxyquire('../../../helpers/jwtToken', {
                'jwt-simple': jwtStub
            });

            jwtHelper.setExpirationDate = sinon.stub().returns(new Date());

            jwtHelper.genToken(userStub);

            expect(jwtStub.encode).to.be.calledWith({
                exp: sinon.match.date
            }, constants.TOKEN_SECRET);
        });

    });
});
