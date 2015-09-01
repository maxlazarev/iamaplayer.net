require('../../../constants')();
var jwtHelper = require('../../../helpers/jwtToken');

describe('Jwt token helper',function() {

    describe('setExpirationDate method', function() {
        it('should create date object', function() {
            var Date = sinon.stub(global, 'Date');
            Date.now = sinon.spy();
            Date.prototype.getDate = sinon.spy();
            Date.prototype.setDate = sinon.spy();

            jwtHelper.setExpirationDate(global.TOKEN_EXPIRE_DAYS);

            expect(Date).to.be.called;
            expect(Date.prototype.getDate).to.be.called;
            expect(Date.prototype.setDate).to.be.calledWith(Date.prototype.getDate() + global.TOKEN_EXPIRE_DAYS);
        });
    });

    describe('genToken method', function() {
        it('should call setExpirationDate method', function() {
            jwtHelper.setExpirationDate = sinon.spy();

            jwtHelper.genToken();

            expect(jwtHelper.setExpirationDate).to.be.calledWith(global.TOKEN_EXPIRE_DAYS);
        });
    });
});
