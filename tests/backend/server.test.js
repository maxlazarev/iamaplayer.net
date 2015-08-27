var proxyquire;
var expressStub;
var app;
var configStub;
var mongooseStub;
var server = function() {
    proxyquire('../../server', {
        './server/configure':   configStub,
        express:                expressStub,
        mongoose:               mongooseStub
    });
};

describe('Server', function() {

    beforeEach(function() {
        proxyquire = require('proxyquire');
        app = {
            get:    sinon.stub().returns(3300),
            set:    sinon.spy(),
            listen: sinon.spy(),
            use:    sinon.spy()
        };
        expressStub = sinon.stub().returns(app);
        configStub = sinon.stub().returns(app);
        mongooseStub = {
            connect: sinon.spy(),
            connection: {
                on: sinon.spy()
            }
        };
        server();
    });

    it('should connect mongoose', function() {
        expect(mongooseStub.connect).to.be.calledWith('mongodb://localhost/iamaplayer');
    });

    it('should lon openning', function() {
        expect(mongooseStub.connection.on).to.be.calledWith('open', sinon.match.func);
    });

    it('should bootstrap the app', function() {
        expect(expressStub).to.be.called;
    });

    it('should configure the app', function() {
        expect(configStub).to.be.called;
    });

    it('should launch the app', function() {
        expect(app.listen).to.be.calledWith(3300, sinon.match.func);
    });

});
