adminAppDirectives.directive('errorsCarrier', ['$http', function($http) {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            var siblingClass = attributes.errorsCarrier;

            scope.$watch(function() {
                console.log($(element).hasClass('ng-invalid') && $(element).hasClass('ng-touched'));
                return ($(element).hasClass('ng-invalid') &&
                    $(element).hasClass('ng-touched') &&
                    $(element).siblings('label').hasClass('active'));
            }, function(hasClass) {
                if (hasClass === true) {
                    $(element).siblings('.' + siblingClass).show();
                } else {
                    $(element).siblings('.' + siblingClass).hide();
                }
            });
        }
    };
}]);
