(function() {
    'use strict';
    angular
        .module('adminApp')
        .factory('auth', authFactory);

    /**
     * Creates authentication service
     *
     * @param {obj} $http
     * @param {obj} $location
     * @returns {{login: Function}}
     */
    function authFactory($http, $location) {
        return {
            login: function(data, success, error) {
                $http.post('/login', data)
                    .then(success)
                    .catch(error);
            }
        };
    }
})();
