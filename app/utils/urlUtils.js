(function () {
    'use strict';
    
    angular.module('springbok.core').service('urlUtils', urlUtils);
    
    function urlUtils() {
        this.addSlashAtTheEndIfNotPresent = function(url) {
            if (!s.isBlank(url)) {
                var lastIndexOfSlash = url.lastIndexOf('/');
                var lastCharacterIsASlash = lastIndexOfSlash === (url.length - 1);

                if (!lastCharacterIsASlash) {
                    url += '/';
                } 
            }
            
            return url;
        };
        
        this.processUrlWithPathVariables = function(url, pathVariables, pathVariableCharacter) {
            var processedUrl = url,
                paramMatch;

            if (_.isUndefined(pathVariables) || !_.isObject(pathVariables)) {
                return processedUrl;
            }
            
            _.each(_.keys(pathVariables), function (key) {
                paramMatch = pathVariableCharacter + key;
                if (s.include(url, paramMatch)) {
                    processedUrl = processedUrl.replace(paramMatch, pathVariables[key]);
                }
            });

            return processedUrl;
        };
    }
})();

