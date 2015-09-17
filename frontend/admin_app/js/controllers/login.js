'user strict';

adminAppControllers.controller('loginController', [
    '$scope', '$location', 'auth', function($scope, $location, auth) {

        $scope.login = function() {
            console.log($scope.form);
            return false;
        };

        auth.login({
            email: 'diedsmiling@gmail.com',
            passwrod: '123'
        });
    }]
);
