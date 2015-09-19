'user strict';

adminAppControllers.controller('loginController', [
    '$scope', '$location', 'auth',
    function($scope, $location, auth) {

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

        $scope.onAuthenticationError = function(error) {
            switch (error.data.error){
                case 0:
                    $scope.form.email.$error.required = true;
                    $scope.form.password.$error.required = true;
                    break;
                case 1:
                    $scope.form.email.$error.email = true;
                    break;
                case 2:
                    $scope.form.password.$error.password = true;
                    break;
            }
        };
    }]
);
