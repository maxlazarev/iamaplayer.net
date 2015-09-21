'user strict';

adminAppControllers.controller('loginController', [
    '$scope', '$location', 'auth',
    function($scope, $location, auth) {
        $scope.passwordValidity = true;
        /**
         * Send login data
         *
         * @returns {bool}
         */
        $scope.login = function() {
            if ($scope.form.$valid === true) {
                auth.login($scope.data,
                    $scope.onAuthenticationSuccess, $scope.onAuthenticationError);
            } else {
                return false;
            }
        };

        $scope.onAuthenticationSuccess = function(success) {

        };

        /**
         * Handles login errors
         *
         * @param {obj} error
         */
        $scope.onAuthenticationError = function(error) {
            switch (error.data.error){
                case 0:
                    $scope.form.email.$setValidity('required', false);
                    $scope.form.password.$setValidity('required', false);
                    break;
                case 1:
                    $scope.form.email.$setValidity('email', false);
                    break;
                case 2:
                    $scope.passwordValidity = false;
                    $scope.form.password.$setValidity('password', false);
                    break;
            }
        };
    }]
);
