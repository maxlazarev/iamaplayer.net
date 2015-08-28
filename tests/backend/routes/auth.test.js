require('../../../constants')();
var auth = require('../../../routes/auth');
var req;
var res;
describe('Auth', function() {

    beforeEach(function() {

    });

    it('should handle 401 request with invalid credintals', function() {
        res = {
            status: sinon.spy(),
            json:    sinon.spy()
        };
        req = {
            body: {
                password: '',
                username: ''
            }
        };
        auth.login(req, res);
        expect(res.status).to.be.calledWith(401);
        expect(res.json).to.be.calledWith({
            status:     401,
            meassage:   'Invalid credintals'
        });
    });
});
