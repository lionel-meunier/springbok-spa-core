(function() {
    'use-strict';
    
    var coreDependencies = [
        'pascalprecht.translate', 
        'ngRoute',
        'ui-notification'
    ];
    
    var core = angular.module('springbok.core', coreDependencies);
    
    core.run(['endpoints', function (endpoints) {
        endpoints.add('enums', 'public/constants');
    }]);
})();