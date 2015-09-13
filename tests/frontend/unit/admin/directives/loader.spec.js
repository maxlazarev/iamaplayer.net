describe('data-loader directive', function() {
    var compile;
    var scope;
    var directiveElem;

    beforeEach(function() {
        module('adminApp');
        inject(function($compile, $rootScope, $injector) {
            compile = $compile;
            scope = $rootScope.$new();
            spyOn(scope, '$watch').and.callThrough();
            $http = $injector.get('$http');
        });
    });

    it('should show spinner when request is handled', function() {
        $http.pendingRequests.length = 1;
        directiveElem = getCompiledElem();

        var attr = directiveElem.attr('style');
        expect(scope.$watch).toHaveBeenCalled();
        expect(attr).toEqual('display: block;');
    });

    it('should hide spinner when request is done', function() {
        $http.pendingRequests.length = 0;
        directiveElem = getCompiledElem();

        var attr = directiveElem.attr('style');
        expect(attr).toEqual('display: none;');
    });

    /**
     * Gets directive compiled element
     *
     * @returns {*}
     */
    function getCompiledElem() {
        var element = angular.element('<div class="spinner_container" data-loader></div>');
        var compiledElement = compile(element)(scope);

        scope.$digest();

        return compiledElement;
    }

});

