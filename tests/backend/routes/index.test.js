var app     = {
    get: sinon.stub(),
    post: sinon.spy()
};
var req;
var res     = {
    sendFile: sinon.spy()
};
var routes  = require('../../../routes');
var paths   = require('../../../server/paths');
require('../../../constants')();

describe('Routes', function() {

    it('should have Directory Root constant defined', function() {
        expect(global.DR).to.be.defined;
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
                .to.be.calledWith(global.DR + '/' +  paths.admin.indexDist);
        });

        it('handle /admin', function() {
            expect(app.get).to.be.calledWith('/admin', sinon.match.func);
            expect(res.sendFile)
                .to.be.calledWith(global.DR + '/' + paths.admin.indexDist);
        });

        it('handle /admin/* ', function() {
            expect(app.get).to.be.calledWith('/admin/*', sinon.match.func);
            expect(res.sendFile)
                .to.be.calledWith(global.DR + '/' + paths.front.indexDist);
        });
    });

});