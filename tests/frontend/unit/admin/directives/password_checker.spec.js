describe('Password checker directive', function() {
    var compile;
    var scope;
    var directiveElem;
    var ctrl;

    beforeEach(function() {
        module('adminApp');
        inject(function($compile, $rootScope, $injector) {
            compile = $compile;
            scope = $rootScope.$new();

        });
        scope.passwordValidity = false;
        directiveElem = getCompiledElem();
    });

    it('should change passwordValidity when triggered', function() {
        expect(scope.passwordValidity).toEqual(true);
    });

    /**
     * Gets directive compiled element
     *
     * @returns {*}
     */
    function getCompiledElem() {
        var element = angular.element(
            '<input password-checker="" ng-model="password" type="text">');

        var compiledElement = compile(element)(scope);

        scope.$digest();

        return compiledElement;
    }
});
