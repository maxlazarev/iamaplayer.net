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
        expect(cors(req, res)).to.eventualy().equal('');
    });
});
