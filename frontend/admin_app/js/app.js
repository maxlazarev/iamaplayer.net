var adminApp = angular.module('adminApp', [
    'ngRoute',
    'adminAppControllers'
]);

adminApp.config(['$routeProvider', function($routeProvider) {
    /**
     * Setting routes
     */
    $routeProvider.when('/', {
        templateUrl:    'templates/login.tpl.html',
        controller:     'loginController'
    }).when('/index', {
        templateUrl:    'templates/index.tpl.html',
        controller:     'indexController'
    });

}]);

var adminAppControllers = angular.module('adminAppControllers', []);
