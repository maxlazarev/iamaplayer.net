'use strict';

describe('Admin authentication page', function() {

    beforeEach(function() {
        browser.get('http://localhost:3300/admin/login');
    });

    it('should have a title', function() {
        var titlePromise = browser.getTitle();

        titlePromise.then(function(text) {
            expect(text).toEqual('Iamaplayer.io brains | Login page');
        });

    });
});
