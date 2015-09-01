require('../../../constants')();
var jwtHelper = require('../../../helpers/jwtToken');

describe('Jwt token helper',function() {

    describe('setExpirationDate method', function() {
        it('should create date object', function() {
            var Date = sinon.stub(global, 'Date');
            Date.now = sinon.spy();

            jwtHelper.setExpirationDate(global.TOKEN_EXPIRE_DAYS);

            expect(Date).to.be.called;
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
