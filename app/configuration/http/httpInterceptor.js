(function () {
    'use strict';

    angular.module('springbok.core').factory('httpInterceptor', httpInterceptor);
    
    httpInterceptor.$inject = ['$rootScope', '$q', '$location', 'session'];
    
    function httpInterceptor($rootScope, $q, $location, session) {
        return {
            request: function (config) {
                var account = session.getCurrent();
                
                if (account.token && !session.isExpired()) {
                    config.headers['Authorization'] = account.token;
                    session.updateExpiration();
                } else {
                    $rootScope.$broadcast('http-error-401');
                }
                
                config.headers['Accept-Language'] = session.language.substring(0, 2);
                
                $rootScope.$broadcast('showSpinner');
                return config || $q.when(config);
            },
            requestError: function (rejection) {
                $rootScope.$broadcast('showSpinner');
                return $q.reject(rejection);
            },
            response: function (response) {
                $rootScope.$broadcast('hideSpinner');
                
                return response || $q.when(response);
            },
            responseError: function (response) {
                $rootScope.$broadcast('hideSpinner');
                
                if (response.status === 401) {
                    $rootScope.$broadcast('http-error-401');
                    session.clear();
                    $location.path('/');
                } else if (response.status === 403) {
                    $rootScope.$broadcast('http-error-403');
                } else if (response.status === 404) {
                    $rootScope.$broadcast('http-error-404');
                }
                
                return $q.reject(response);
            }
        };
    }
    
    angular.module('springbok.core').config(['$httpProvider', function($httpProvider) {  
        $httpProvider.interceptors.push('httpInterceptor');
    }]);
})();

