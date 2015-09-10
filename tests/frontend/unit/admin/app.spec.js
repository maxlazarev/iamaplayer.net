describe('Testing config block', function() {
    var mockRouteProvider;

    beforeEach(function() {
        module('ngRoute', function($routeProvider) {
            mockRouteProvider = $routeProvider;
            spyOn(mockRouteProvider, 'when').and.callThrough();
            spyOn(mockRouteProvider, 'otherwise').and.callThrough();
        });

        module('adminApp');
        inject();

    });

    it('should handle "/" request', function() {
        expect(mockRouteProvider.when).toHaveBeenCalledWith('/', {
            templateUrl:    'templates/login.tpl.html',
            controller:     'loginController'
        });
    });

    it('should handle "/index" request', function() {
        expect(mockRouteProvider.when).toHaveBeenCalledWith('/index', {
            templateUrl:    'templates/index.tpl.html',
            controller:     'indexController'
        });
    });

});
