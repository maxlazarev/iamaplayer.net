adminAppDirectives.directive('errorsCarrier', ['$http', function($http) {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            var siblingClass = attributes.errorsCarrier;
            $(element).bind('blur', function() {
                $(element).siblings('.' + siblingClass).show();
            });
            $(element).bind('focus', function() {
                $(element).siblings('.' + siblingClass).hide();
            });
        }
    };
}]);
