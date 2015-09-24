(function() {
    'use strict';
    angular
        .module('adminApp')
        .directive('errorsCarrier', errorCarrier);

    /**
     * Sets event handler for controlling inputs error container visibility
     *
     * @returns {{restrict: string, link: Function}}
     */
    function errorCarrier() {
        return {
            restrict: 'A',
            link: function(scope, element, attributes) {
                var siblingClass = attributes.errorsCarrier;
                $(element).bind('blur', onBlur);
                $(element).bind('focus', onFocus);

                function onBlur() {
                    $(element).siblings('.' + siblingClass).show();
                }

                function onFocus() {
                    $(element).siblings('.' + siblingClass).hide();
                }
            }
        };
    }

})();
