'user strict';

adminAppControllers.controller('loginController', [
    '$scope', '$location', 'auth', function($scope, $location, Auth) {
        Auth.login({
            email: 'diedsmiling@gmail.com',
            passwrod: '123'
        });
    }]
);
