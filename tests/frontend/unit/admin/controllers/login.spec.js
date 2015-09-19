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

        $scope.form = {
            email:      {
                $error: {}
            },
            password:   {
                $error: {}
            },
            $valid: true
        };
    });

    it('should have a login method', function() {
        expect($scope.login).toBeDefined();
    });

    it('login method should handle a request if form validation was passed', function() {
        spyOn(authMock, 'login').and.callThrough();

        $scope.data = {
            email:      'email@email.com',
            password:   'password'
        };

        $scope.login();

        expect(authMock.login).toHaveBeenCalledWith($scope.data,
            $scope.onAuthenticationSuccess, $scope.onAuthenticationError);
    });

    it('login method should return false if form validation failed', function() {
        spyOn($scope, 'login').and.callThrough();
        $scope.form.$valid = false;
        expect($scope.login()).toEqual(false);
    });

    it('should have an onAuthenticationError method', function() {
        expect($scope.onAuthenticationError).toBeDefined();
    });

    it('should set required errors if credentials are empty', function() {
        var error = {
            data: {
                error: 0,
                message: 'Empty credentials',
                status: 401
            }
        };

        $scope.onAuthenticationError(error);
        expect($scope.form.email.$error.required).toBeDefined();
        expect($scope.form.password.$error.required).toBeDefined();
    });

    it('should set email error if email address was wrong', function() {
        var error = {
            data: {
                error: 1,
                message: 'Invalid email address',
                status: 401
            }
        };

        $scope.onAuthenticationError(error);
        expect($scope.form.email.$error.email).toBeDefined();
    });

    it('should set password error if credentials are wrong', function() {
        var error = {
            data: {
                error: 2,
                message: 'Invalid credentials',
                status: 401
            }
        };

        $scope.onAuthenticationError(error);
        expect($scope.form.password.$error.password).toBeDefined();
    });

    it('should have an onAuthenticationSuccess method', function() {
        expect($scope.onAuthenticationSuccess).toBeDefined();
    });
});
