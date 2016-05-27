(function() {
    'use-strict';
    
    var coreDependencies = [
        'pascalprecht.translate', 
        'ngSanitize',
        'ngRoute'
    ];
    
    var core = angular.module('springbok.core', coreDependencies);
    
    core.run(['endpoints', function (endpoints) {
        endpoints.add('enums', 'public/constants');
    }]);
})();