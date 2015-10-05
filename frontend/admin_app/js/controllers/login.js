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
    function loginController($location, $cookies, $location, auth) {
        /* jscs validthis: true */
        var _this = this;

        _this.passwordValidity = true;
        _this.login = login;
        _this.onAuthenticationSuccess = onAuthenticationSuccess;
        _this.onAuthenticationError = onAuthenticationError;

        /**
         * Send login data
         *
         * @returns {bool}
         */
        function login() {
            if (_this.form.$valid === true) {
                auth.login(_this.data,
                    _this.onAuthenticationSuccess, _this.onAuthenticationError);
            } else {
                return false;
            }
        }

        function onAuthenticationSuccess(success) {
            $cookies.put('username', success.data.user.username);
            $cookies.put('role', success.data.user.role);
            $cookies.put('token', success.data.token);
            $location.path('/admin/pages');
        }

        /**
         * Handles login errors
         *
         * @param {obj} error
         */
        function onAuthenticationError(error) {
            switch (error.data.error){
                case 0:
                    _this.form.email.$setValidity('required', false);
                    _this.form.password.$setValidity('required', false);
                    break;
                case 1:
                    _this.form.email.$setValidity('email', false);
                    break;
                case 2:
                    _this.passwordValidity = false;
                    _this.form.password.$setValidity('password', false);
                    break;
            }
        }
    }
})(window.angular);
