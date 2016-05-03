(function () {
    'use strict';
    
    angular.module('springbok.core').config(Logging);
    
    Logging.$inject = ['$logProvider'];
    
    function Logging($logProvider) {
        $logProvider.debugEnabled(CONFIG.app.logDebugEnabled);
    }
})();

