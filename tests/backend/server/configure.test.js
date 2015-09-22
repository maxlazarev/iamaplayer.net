var app;
var csrfStub;
var routesStub;
var express     = require('express');
var configure   = require('../../../server/configure');
var proxyquire  = require('proxyquire');

/**
 * Checks if a middleware is set up
 *
 * @param {obj} app Injected app object
 * @param {str} middlewareName Middleware name
 * @returns {bool}
 */
function isMiddlewareSet(app, middlewareName) {
    var _return = false;
    app._router.stack.filter(function(layer) {
        if (layer.handle.name == middlewareName) {
            _return = true;
        }
    });
    return _return;
}

describe('Server configurations', function() {

    afterEach(function() {
        configure = require('../../../server/configure');
    });

    describe('(while using app stub)', function() {
        beforeEach(function() {
            app = {
                get:    sinon.spy(),
                post:   sinon.spy(),
                set:    sinon.spy(),
                use:    sinon.spy(),
                all:    sinon.stub()
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

    describe('(while initialising app)', function() {

        beforeEach(function() {
            app = express();
            configure(app);
        });

        it('should use "errorHandler" middleware in dev env', function() {
            expect(isMiddlewareSet(app, 'errorHandler')).to.equal(true);
        });

        it('should use "morgan" middleware logger', function() {
            expect(isMiddlewareSet(app, 'logger')).to.equal(true);
        });

        it('should use "bodyParser.json" middleware', function() {
            expect(isMiddlewareSet(app, 'jsonParser')).to.equal(true);
        });

        it('should use "bodyParser.urlencoded" middleware', function() {
            expect(isMiddlewareSet(app, 'urlencodedParser')).to.equal(true);
        });

        it('should use "cookieParser" middleware', function() {
            expect(isMiddlewareSet(app, 'cookieParser')).to.equal(true);
        });

        it('should use "csrf" middleware', function() {
            expect(isMiddlewareSet(app, 'csrf')).to.equal(true);
        });

    });

    describe('(while stubbing csrf())', function() {
        it('should set call crf() and set cookie option to true', function() {
            app = {
                get:    sinon.spy(),
                post:   sinon.spy(),
                set:    sinon.spy(),
                use:    sinon.spy(),
                all:    sinon.stub()
            };

            csrfStub = sinon.spy();
            routesStub = {
                initialize: sinon.spy()
            };

            proxyquire.preserveCache();
            configure = proxyquire('../../../server/configure', {
                csurf:          csrfStub,
                '../routes':    routesStub
            });

            configure(app);

            expect(app.use).to.be.calledAfter(routesStub.initialize);
            expect(csrfStub).to.be.calledWith({cookie: true});
        });
    });

});
