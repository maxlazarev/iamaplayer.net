'use strict';
var mockHttp;
var mockLocalStorage;
var mockLocation;
var AuthObj;
var $http = {
    post: function() {
        console.log('post request ...');
    }
};

describe('Auth service', function() {
    beforeEach(function() {
        module(function($provide, $injector) {
            $provide.service('$http', function() {
                spyOn($http, 'post').and.callFake(function() {
                    return {
                        token:  'token_string',
                        user:   {
                            data: 'some_data'
                        }
                    };
                });
            });
            $provide.service('modalSvc', function() {
                //mock a method
            });

        });
        module('adminApp');

        inject(function($http, $location, Auth, $injector) {
            $http = $injector.get('$http');
            mockHttp = $http;
            mockLocation = $location;
            AuthObj = Auth;

        });
    });

    it('it should decode token', function() {
        AuthObj.login({data: 'data'});
        expect();
    });
});
