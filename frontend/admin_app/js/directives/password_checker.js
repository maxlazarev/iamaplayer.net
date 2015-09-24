(function() {
    'use strict';
    angular
        .module('adminApp')
        .directive('passwordChecker', passwordChecker);

    /**
     * Overrides password validation
     *
     * @returns {{require: string, link: Function}}
     */
    function passwordChecker() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.password = function(modelValue, viewValue) {
                    scope.passwordValidity = true;
                    return true;
                };
            }
        };
    }
})();
