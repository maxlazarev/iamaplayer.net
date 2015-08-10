var app     = {
    get: sinon.spy(),
    post: sinon.spy()
};
var req;
var res     = sinon.spy();
var routes  = require('../../../server/routes');
var paths   = require('../../../server/paths');

describe('Routes', function() {

    it('should have Directory Root constant defined', function() {
        expect(global.DR).to.be.defined;
    });

    describe('should pass routing to angular', function() {
        beforeEach(function() {
            app.get = sinon.stub().callsArgWith(1, req, res);
            res.sendFile = sinon.spy();
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