var adminApp = angular.module('adminApp', [
    'ngRoute',
    'ngAnimate',
    'adminAppControllers',
    'adminAppDirectives'
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
var adminAppDirectives = angular.module('adminAppDirectives', []);
