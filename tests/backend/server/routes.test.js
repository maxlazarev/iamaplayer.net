var app = {
    get: sinon.spy(),
    post: sinon.spy()
};
var req;
var res = sinon.spy();
var routes = require('../../../server/routes');

describe('Routes', function() {

    describe('should pass routing to angular', function() {
        beforeEach(function() {
            app.get = sinon.stub().callsArgWith(1, req, res);
            res.sendFile = sinon.spy();
            routes.initialize(app);
        });

        it('handle *', function() {
            expect(app.get).to.be.calledWith('*', sinon.match.func);
            expect(res.sendFile).to.be.calledWith('./public/index.html');
        });

        it('handle /admin/* ', function() {
            expect(app.get).to.be.calledWith('/admin/*', sinon.match.func);
            expect(res.sendFile).to.be.calledWith('./public/admin/index.html');
        });
    });
});