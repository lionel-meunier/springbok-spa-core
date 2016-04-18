(function() {
    'use-strict';
    
    const coreDependencies = [
        'pascalprecht.translate', 
        'ngSanitize',
        'ngRoute'
    ];
    
    const core = angular.module('springbok.core', coreDependencies);
    
    core.run(['endpoints', function (endpoints) {
        endpoints.add('enums', 'public/constants');
    }]);
})();