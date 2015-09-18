'use strict';

describe('loginController', function() {
    var $controller;
    var $auth;
    var $scope = {};
    var authMock;

    beforeEach(function() {
        module('adminApp');

        authMock = {
            login: function() {}
        };

        inject(function($rootScope, _$controller_) {
            $controller = _$controller_;
        });

        var controller = $controller('loginController', {
            $scope: $scope,
            auth: authMock
        });
    });

    it('should have a valid login method', function() {
        spyOn(authMock, 'login').and.callThrough();

        $scope.data = {
            email:      'email@email.com',
            password:   'password'
        };
        $scope.login();

        expect($scope.login).toBeDefined();
        expect(authMock.login).toHaveBeenCalledWith($scope.data,
            $scope.onAuthenticationSuccess, $scope.onAuthenticationError);
    });

    it('should have an onAuthenticationSuccess method', function() {
        expect($scope.onAuthenticationSuccess).toBeDefined();
    });

    it('should have an onAuthenticationError method', function() {
        var $scope = {};
        var controller = $controller('loginController', { $scope: $scope });
        expect($scope.onAuthenticationError).toBeDefined();
    });
});
