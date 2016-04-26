(function () {
    'use strict';

    angular.module('springbok.core').filter('statusKey', statusKey);
    
    function statusKey() {
        return function(status) {
            if (_.isNull && _.isUndefined && status === true) {
                return 'GLOBAL_ACTIVATED';
            } else {
                return 'GLOBAL_DEACTIVATED';
            }
        };
    }
})();

