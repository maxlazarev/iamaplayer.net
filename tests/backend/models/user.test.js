var UserModel = require('../../../models/user');

describe('User model', function() {
    var user;
    beforeEach(function() {
        user = new UserModel({
            email:      'diedsmiling@gmail.com',
            password:   'pretend_to_be_a_hashed_string',
            role:       1,
            firstName:  'Lazarev',
            lastName:   'Alexandr'
        });

    });

    it('should have a schema', function() {
        expect(UserModel.schema).to.be.defined;
    });

    describe('Schema', function() {
        it('should have an email', function() {
            expect(typeof user.email).to.be.equal('string');
        });

        it('should have a password', function() {
            expect(typeof user.password).to.be.equal('string');
        });

        it('should have a creation timestamp', function() {
            expect(typeof user.created).to.be.equal('object');
        });

        it('should have an update timestamp', function() {
            expect(typeof user.updated).to.be.equal('object');
        });

        it('should have a role', function() {
            expect(typeof user.role).to.be.equal('number');
        });
    });

    describe('Virtuals', function() {
        it('should have a full name', function() {
            expect(user.fullname).to.be.equal('Lazarev Alexandr');
        });
    });

});
