'user strict';

adminAppControllers.controller('loginController', [
    '$scope', '$location', function($scope, $location, $rootElement) {
        $rootElement.data("$$ngAnimateState").running = false;
    }]
);
