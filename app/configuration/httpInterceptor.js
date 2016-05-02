(function () {
    'use strict';
    
    
    angular.module('springbok.core').factory('httpInterceptor', httpInterceptor);
    
    httpInterceptor.$inject = ['$rootScope', '$q', 'session'];
    
    function httpInterceptor($rootScope, $q, session) {
        return {
            request: function (config) {
                var account = session.getCurrent();
                
                console.log('httpInter : session.account', account);
                
                if (account.token) {
                    config.headers['Authorization'] = account.token;
                }
                
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

