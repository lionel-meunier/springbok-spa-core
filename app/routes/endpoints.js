(function () {
    'use strict';
    
    angular.module('springbok.core').service('endpoints', endpoints);
    
    endpoints.$inject = ['$log', 'urlUtils'];
    
    function endpoints($log, urlUtils) {
        this.apiRootPath = '';
        
        this.routes = {};
        
        /**
         * Sets the server API root path
         * @param {string} apiRootPath the server API root path
         * @returns {void}
         */
        this.setApiRootPath = function(apiRootPath) {
            this.apiRootPath = urlUtils.addSlashAtTheEndIfNotPresent(apiRootPath);
        };
        
        /**
         * Adds a route, example : endpoints.add('enums', '/api/public/constants')
         * @param {string} routeKey the 
         * @param {string} route
         * @returns {void}
         */
        this.add = function(routeKey, route) {
            this.routes[routeKey] = route;
        };
        
        /**
         * Retrieve a relative URL from a key, and process its parameters if exists
         *
         * @param routeName key of the requested route such as auth for /auth/logout
         * @param parameters path parameters example :
         * {
         *  id: value,
         *  name: value
         * }
         * for URLs like /myurl/:id/people/:name
         *
         * @returns {string} relative URL with processed parameters
         * @see routes
         */
        this.get = function (routeName, parameters) {
            var route = this.routes[routeName];
            
            if (s.isBlank(this.apiRootPath)) {
                $log.debug('The API root path has not been set, call setApiRootPath(apiRootPath) to set the API root path, example : endpoints.setApiRootPath(\'http://client.iocean.fr/api/\')');
            }
            
            return this.apiRootPath + this.processParameters(route, parameters);
        };
        
        /**
         * Process URL parameters
         *
         * @param route relative raw URL such as /myurl/:id/people/:name
         * @param parameters path parameters key/value object
         * @return {string} relative url with parameter placeholders replaced by values
         */
        this.processParameters = function (route, parameters) {
            return urlUtils.processUrlWithPathVariables(route, parameters, ':');
        };
    }
})();

