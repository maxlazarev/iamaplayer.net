describe('Errors carrier directive', function() {
    var compile;
    var scope;
    var directiveElem;

    beforeEach(function() {
        module('adminApp');
        inject(function($compile, $rootScope, $injector) {
            compile = $compile;
            scope = $rootScope.$new();
        });
        directiveElem = getCompiledElem();
    });

    it('should show sibling error container if has error class class', function() {
        $(directiveElem[1]).triggerHandler('focus');
        expect($(directiveElem[0]).attr('style')).toEqual('display: none;');
    });

    it('should hide sibling error container if doesn`t have error class', function() {
        $(directiveElem[1]).triggerHandler('blur');
        expect($(directiveElem[0]).attr('style')).toEqual('display: inline;');
    });

    /**
     * Gets directive compiled element
     *
     * @returns {*}
     */
    function getCompiledElem() {
        var element = angular.element('' +
            '<span class="errors_container"></span>' +
            '<input errors-carrier="errors_container" type="text">'
        );

        var compiledElement = compile(element)(scope);

        scope.$digest();

        return compiledElement;
    }
});