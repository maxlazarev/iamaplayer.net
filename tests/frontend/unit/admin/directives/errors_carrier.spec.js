describe('Errors carrier directive', function() {
    var compile;
    var scope;
    var directiveElem;

    beforeEach(function() {
        module('adminApp');
        inject(function($compile, $rootScope, $injector) {
            compile = $compile;
            scope = $rootScope.$new();
            spyOn(scope, '$watch').and.callThrough();
        });
    });

    it('should show sibling error container if has error class class', function() {
        directiveElem = getCompiledElem(true, true);

        expect(scope.$watch).toHaveBeenCalled();
        expect($(directiveElem[0]).attr('style')).toEqual('display: inline;');
    });

    it('should hide sibling error container if doesn`t have error class', function() {
        directiveElem = getCompiledElem(false, true);

        expect($(directiveElem[0]).attr('style')).toEqual('display: none;');

        directiveElem = getCompiledElem(false, false);

        expect($(directiveElem[0]).attr('style')).toEqual('display: none;');
    });

    /**
     * Gets directive compiled element
     *
     * @returns {*}
     */
    function getCompiledElem(showClass, labelActive) {
        var element = angular.element('' +
            '<span class="errors_container"></span>' +
            '<input class="' +
                (showClass === true ? 'ng-invalid ng-touched' : '') +
            '" errors-carrier="errors_container" type="text">' +
            '<label ' +
                (showClass === true ? 'class="active"' : '') + '</label>');
        var compiledElement = compile(element)(scope);

        scope.$digest();

        return compiledElement;
    }
});