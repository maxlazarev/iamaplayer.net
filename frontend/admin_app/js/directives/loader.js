(function() {
    'use strict';
    angular
        .module('adminApp')
        .directive('loader', loader);

    /**
     * Defines loading spinner behaviour
     *
     * @param {obj} $http
     * @returns {{restrict: string, link: Function}}
     */
    function loader($http) {
        return {
            restrict: 'A',
            link: function(scope, element, attributes) {
                scope.$watch(function() {
                    return $http.pendingRequests.length;
                }, function(isLoading) {
                    if (isLoading) {
                        $(element).show();
                    } else {
                        $(element).hide();
                    }
                });
            }
        };
    }
})();
