var app;
var express     = require('express');
var configure   = require('../../../server/configure');

/**
 * Checks if a middleware is set up
 *
 * @param {object} app Injected app object
 * @param {string} middlewareName Middleware name
 * @returns {boolean}
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
            expect(isMiddlewareSet(app, 'json')).to.equal(true);
        });

    });

});
