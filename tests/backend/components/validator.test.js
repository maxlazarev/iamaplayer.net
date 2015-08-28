var validator = require('../../../components/validator');

describe('Validator', function() {
    it('should validate email adress', function() {
        expect(validator.email('false email')).to.equal(false);
        expect(validator.email('email@example.com')).to.equal(true);
    });
});
