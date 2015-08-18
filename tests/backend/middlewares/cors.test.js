var httpMocks   = require('node-mocks-http');
var cors        = require('../../../middlewares/cors');
var req;
var res;

describe('CORS middleware', function() {
    beforeEach(function() {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
    });

    it('should set "Acces-Control-Allow-Origin" header', function() {
        return expect(cors(req, res))
            .to.eventually.have.deep
            .property('_headers.Access-Control-Allow-Origin', '*');
    });

    it('Should set "Access-Control-Allow-Methods" header', function() {
        return expect(cors(req, res))
            .to.eventually.have.deep
            .property('_headers.Access-Control-Allow-Methods',
            'GET,PUT,POST,DELETE,OPTIONS');
    });

    it('Should set "Access-Control-Allow-Headers" header', function() {
        return expect(cors(req, res))
            .to.eventually.have.deep
            .property('_headers.Access-Control-Allow-Headers',
            'Content-type,Accept,X-Access-Token,X-Key');
    });
});
