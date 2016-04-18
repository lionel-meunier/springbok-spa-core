(function() {
    'use-strict';
    
    const core = angular.module('springbok.core', ['pascalprecht.translate', 'ngSanitize']);
    
    core.run(['endpoints', function (endpoints) {
        endpoints.add('enums', 'public/constants');
    }]);
})();