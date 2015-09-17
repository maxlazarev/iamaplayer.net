'use strict';
var auth;
var httpBackend;
var requestedData;
var result;
var mockCallbacks;

describe('auth service', function() {
    beforeEach(function() {
        mockCallbacks = {
            success: function(response) {
                result = response;
            },
            error: function() {

            }
        };
        requestedData = {
            email:      'valid@email.com',
            passord:    'valid_password'
        };

        module('adminApp');

        inject(function($httpBackend, $location, _auth_, $injector) {
            httpBackend = $httpBackend;
            auth = _auth_;
        });

        spyOn(mockCallbacks, 'success').and.callThrough();
        spyOn(mockCallbacks, 'error').and.callThrough();
    });

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should have a login function', function() {
        expect(angular.isFunction(auth.login)).toBe(true);
    });

    it('should handle a request and call error callback on failure', function() {
        httpBackend.expectPOST('/login', requestedData).respond(500, '');
        auth.login(requestedData, mockCallbacks.success, mockCallbacks.error);

        httpBackend.flush();
        expect(mockCallbacks.error).toHaveBeenCalled;
    });

    it('it should handle a request and call success callback', function() {
        var returnData = {
            token:      'token_string',
            expires:    1442956160213,
            user: {
                _id:        '55e17437e5c84aea343e12fd',
                email:      'diedsmiling@gmail.com',
                firstName:  'Lazarev',
                lastName:   'Alexandr',
                updated:    '2015-08-29T08:58:31.178Z',
                created:    '2015-08-29T08:58:31.177Z',
                role:       '2'
            }
        };

        httpBackend.expectPOST('/login', requestedData).respond(returnData);
        auth.login(requestedData, mockCallbacks.success, mockCallbacks.error);

        httpBackend.flush();

        expect(mockCallbacks.success).toHaveBeenCalled;
        expect(result.data).toEqual(returnData);
    });
});
