'use strict';
var mockHttp;
var mockLocalStorage;
var mockLocation;
var mockAuth;

describe('Auth service', function() {
    beforeEach(function() {
        module(function($provide) {
            $provide.service('$http', function() {
                //mock a mehtod
            });
            $provide.service('modalSvc', function() {
                //mock a method
            });
        });
        module('adminApp');

        inject(function($http, $location, Auth) {
            mockHttp = $http;
            mockLocation = $location;
            mockAuth = Auth;
        });
    });

    it('it should decode token', function() {
        expect();
    });
});
