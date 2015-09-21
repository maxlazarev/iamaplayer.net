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
                $error: {},
                $setValidity: function() {}
            },
            password:   {
                $error: {},
                $setValidity: function() {}
            },
            $valid: true
        };
    });

    describe('$scope.login method', function() {
        it('should exist', function() {
            expect($scope.login).toBeDefined();
        });

        it('should handle a request if form validation was passed', function() {
            spyOn(authMock, 'login').and.callThrough();

            $scope.data = {
                email:      'email@email.com',
                password:   'password'
            };

            $scope.login();
            expect(authMock.login).toHaveBeenCalledWith($scope.data,
                $scope.onAuthenticationSuccess, $scope.onAuthenticationError);
        });

        it('should return false if form validation failed', function() {
            spyOn($scope, 'login').and.callThrough();
            $scope.form.$valid = false;
            expect($scope.login()).toEqual(false);
        });

    });

    describe('$scope.onAuthenticationError method', function() {
        beforeEach(function() {
            spyOn($scope.form.email, '$setValidity').and.callThrough();
            spyOn($scope.form.password, '$setValidity').and.callThrough();
        });

        it('should exist', function() {
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
            expect($scope.form.email.$setValidity).toHaveBeenCalledWith('required', false);
            expect($scope.form.password.$setValidity).toHaveBeenCalledWith('required', false);
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
            expect($scope.form.email.$setValidity).toHaveBeenCalledWith('email', false);
        });

        it('should set password error if credentials are wrong', function() {
            var error = {
                data: {
                    error: 2,
                    message: 'Invalid credentials',
                    status: 401
                }
            };
            expect($scope.passwordValidity).toEqual(true);
            $scope.onAuthenticationError(error);
            expect($scope.form.password.$setValidity).toHaveBeenCalledWith('password', false);
            expect($scope.passwordValidity).toEqual(false);
        });
    });

    describe('onAuthenticationSuccess method', function() {
        it('should exist', function() {
            expect($scope.onAuthenticationSuccess).toBeDefined();
        });

        it('should save data to localstorage', function() {
            var success = {

            };
        });
    });
});
