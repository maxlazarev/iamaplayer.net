var app;
var request     = require('request');
var express     = require('express');
var configure   = require('../../../server/configure');
var req;
var res         = {
    header: sinon.spy(),
    res:    sinon.stub(),
    next:   sinon.stub()
};
var next;
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
                get: sinon.spy(),
                set: sinon.spy(),
                use: sinon.spy(),
                all: sinon.stub()
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
          //  app.all = sinon.spy();

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

        it('Should set "Access-Control-Allow-Origin" header ', function() {
            it('should return 400', function (done) {
                request.get('http://localhost:8000', function (err, res, body){
                    expect(res.statusCode).to.equal(400);
                    expect(res.body).to.equal('wrong header');
                    done();
                });
            });
            //app.all = sinon.stub().callsArgWith(1, req, res, next);
            // expect(res.header).to.be.called;
        });

    });


});