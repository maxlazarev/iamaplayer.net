adminAppDirectives.directive('passwordChecker', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.password = function(modelValue, viewValue) {
                scope.passwordValidity = true;
                return true;
            };
        }
    };
});
