'use strict';

describe('loginController', function() {
    var $controller;
    var $auth;
    var $scope = {};
    var authMock;
    var controller;
    var $cookies;
    var $location;

    beforeEach(function() {
        module('adminApp');

        authMock = {
            login: function() {}
        };

        inject(function($rootScope, _$controller_, _$cookies_, _$location_) {
            $controller = _$controller_;
            $cookies = _$cookies_;
            $location = _$location_;
        });

        spyOn($location, 'path').and.callThrough();

        controller = $controller('loginController', {
            auth: authMock
        });

        controller.form = {
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
            expect(controller.login).toBeDefined();
        });

        it('should handle a request if form validation was passed', function() {
            spyOn(authMock, 'login').and.callThrough();

            controller.data = {
                email:      'email@email.com',
                password:   'password'
            };

            controller.login();
            expect(authMock.login).toHaveBeenCalledWith(controller.data,
                controller.onAuthenticationSuccess, controller.onAuthenticationError);
        });

        it('should return false if form validation failed', function() {
            spyOn(controller, 'login').and.callThrough();
            controller.form.$valid = false;
            expect(controller.login()).toEqual(false);
        });

    });

    describe('$scope.onAuthenticationError method', function() {
        beforeEach(function() {
            spyOn(controller.form.email, '$setValidity').and.callThrough();
            spyOn(controller.form.password, '$setValidity').and.callThrough();
        });

        it('should exist', function() {
            expect(controller.onAuthenticationError).toBeDefined();
        });

        it('should set required errors if credentials are empty', function() {
            var error = {
                data: {
                    error: 0,
                    message: 'Empty credentials',
                    status: 401
                }
            };

            controller.onAuthenticationError(error);
            expect(controller.form.email.$setValidity).toHaveBeenCalledWith('required', false);
            expect(controller.form.password.$setValidity).toHaveBeenCalledWith('required', false);
        });

        it('should set email error if email address was wrong', function() {
            var error = {
                data: {
                    error: 1,
                    message: 'Invalid email address',
                    status: 401
                }
            };

            controller.onAuthenticationError(error);
            expect(controller.form.email.$setValidity).toHaveBeenCalledWith('email', false);
        });

        it('should set password error if credentials are wrong', function() {
            var error = {
                data: {
                    error: 2,
                    message: 'Invalid credentials',
                    status: 401
                }
            };
            expect(controller.passwordValidity).toEqual(true);
            controller.onAuthenticationError(error);
            expect(controller.form.password.$setValidity).toHaveBeenCalledWith('password', false);
            expect(controller.passwordValidity).toEqual(false);
        });
    });

    describe('onAuthenticationSuccess method', function() {
        it('should exist', function() {
            expect(controller.onAuthenticationSuccess).toBeDefined();
        });

        it('should save data to cookies', function() {
            var success = {
                data: {
                    expires:    'TIMESTAMP',
                    token:      'TOKEN_STRING',
                    user:       {
                        username: 'username',
                        'role':   1

                    }
                }
            };
            controller.onAuthenticationSuccess(success);
            expect($cookies.get('token')).toEqual('TOKEN_STRING');
            expect($cookies.get('username')).toEqual('username');
            expect($cookies.get('role')).toEqual('1');
            expect($location.path).toHaveBeenCalledWith('/admin/pages');

        });
    });
});
