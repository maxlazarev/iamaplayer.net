var app;
var configure   = require('../../../server/configure');
var morgan      = sinon.spy();

describe('Server configs', function() {

    describe('without using app methods', function() {
        beforeEach(function() {
            app = {
                get: sinon.spy(),
                set: sinon.spy(),
                use: sinon.spy()
            };
            configure(app);
        });

        it('should set the port', function() {
            expect(app.set).to.be.calledWith('port', 3300);
        });

        it('should set public directory for static requests', function() {
            expect(app.use).to.be.calledWith('/public', sinon.match.func);
        });

    });

    it('should use error handler in dev enviroment', function() {
        app = {
            get: sinon.stub().returns('development'),
            set: sinon.spy(),
            use: sinon.spy()
        };
        configure(app);
        expect(app.use.thirdCall).to.be.calledWith(sinon.match.func);
    });

    it('should use morgan', function() {
        app = {
            get: sinon.stub().returns('development'),
            set: sinon.spy(),
            use: sinon.spy()
        };
        configure(app);
        expect(app.use.firstCall).to.be.calledWith(sinon.match.func);
    });

});