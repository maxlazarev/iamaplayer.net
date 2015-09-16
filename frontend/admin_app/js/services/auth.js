angular.module('adminApp').factory('auth',
    ['$http', '$location',
        function($http, $location) {
            return {
                login: function(data, success, error) {
                    $http.post('/login', data)
                        .then(success)
                        .catch(error);
                }
            };
        }
    ]
);
