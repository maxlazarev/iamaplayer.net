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
            auth.login($scope.data,
                $scope.onAuthenticationSuccess, $scope.onAuthenticationError);
        };

        $scope.onAuthenticationSuccess = function(success) {

        };

        $scope.onAuthenticationError = function(error) {

        };
    }]
);
