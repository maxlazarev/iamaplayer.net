var constants   = require('../../../constants');
var routes      = require('../../../routes');
var auth        = require('../../../routes/auth');
var paths       = require('../../../server/paths');
var req;
var app         = {
    get: sinon.stub(),
    post: sinon.spy()
};
var res     = {
    sendFile: sinon.spy()
};

describe('Routes', function() {

    it('should have Directory Root constant defined', function() {
        expect(constants.DR).to.be.defined;
    });

    describe('should pass routing to angular', function() {
        beforeEach(function() {
            app.get.onFirstCall().callsArgWith(1, req, res)
                .onSecondCall().callsArgWith(1, req, res)
                .onThirdCall().callsArgWith(1, req, res);

            routes.initialize(app);
        });

        it('handle *', function() {
            expect(app.get).to.be.calledWith('*', sinon.match.func);
            expect(res.sendFile)
                .to.be.calledWith(constants.DR + '/' +  paths.admin.indexDest);
        });

        it('handle /admin', function() {
            expect(app.get).to.be.calledWith('/admin', sinon.match.func);
            expect(res.sendFile)
                .to.be.calledWith(constants.DR + '/' + paths.admin.indexDest);
        });

        it('handle /admin/* ', function() {
            expect(app.get).to.be.calledWith('/admin/*', sinon.match.func);
            expect(res.sendFile)
                .to.be.calledWith(constants.DR + '/' + paths.front.indexDest);
        });
    });

    describe('auth routing', function() {
        beforeEach(function() {
            routes.initialize(app);
        });

        it('should handle /login ', function() {
            expect(app.post).to.be.calledWith('/login', auth.login);
        });

    });

});
