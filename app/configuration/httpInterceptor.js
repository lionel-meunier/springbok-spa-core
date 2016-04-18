(function () {
    'use strict';
    
    
    angular.module('springbok.core').factory('httpInterceptor', httpInterceptor);
    
    httpInterceptor.$inject = ['$rootScope', '$q'];
    
    function httpInterceptor($rootScope, $q) {
        return {
            request: function (config) {
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
                return response;
            }
        };
    }
    
    angular.module('springbok.core').config(['$httpProvider', function($httpProvider) {  
        $httpProvider.interceptors.push('httpInterceptor');
    }]);
})();

