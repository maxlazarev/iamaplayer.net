(function(angular) {
    'user strict';

    angular
        .module('adminApp')
        .controller('loginController', loginController);

    /**
     * loginController
     *
     * @param {obj} $location
     * @param {obj} auth
     */
    function loginController($location, auth) {
        /* jscs validthis: true */
        var vm = this;
        console.log(vm);

        vm.passwordValidity = true;
        vm.login = login;
        vm.onAuthenticationSuccess = onAuthenticationSuccess;
        vm.onAuthenticationError = onAuthenticationError;

        /**
         * Send login data
         *
         * @returns {bool}
         */
        function login() {
            console.log(vm);
            if (vm.form.$valid === true) {
                auth.login(vm.data,
                    vm.onAuthenticationSuccess, vm.onAuthenticationError);
            } else {
                return false;
            }
        }

        function onAuthenticationSuccess(success) {

        }

        /**
         * Handles login errors
         *
         * @param {obj} error
         */
        function onAuthenticationError(error) {
            switch (error.data.error){
                case 0:
                    vm.form.email.$setValidity('required', false);
                    vm.form.password.$setValidity('required', false);
                    break;
                case 1:
                    vm.form.email.$setValidity('email', false);
                    break;
                case 2:
                    vm.passwordValidity = false;
                    vm.form.password.$setValidity('password', false);
                    break;
            }
        }
    }
})(window.angular);
