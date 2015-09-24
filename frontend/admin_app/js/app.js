angular
    .module('adminApp', [
        'ngRoute',
        'ngAnimate'
    ])
    .config(['$routeProvider', appConfig]);

/**
 * Sets application configs
 *
 * @param {obj} $routeProvider
 */
function appConfig($routeProvider) {
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
}
