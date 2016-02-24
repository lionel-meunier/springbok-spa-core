(function() {
    'use-strict';
    
    const core = angular.module('springbok.core', []);
    
    core.run(['endpoints', function (endpoints) {
        endpoints.add('enums', 'public/constants');
    }]);

    core.run(['enums', function (enums) {
        enums.load();
    }]);
})();