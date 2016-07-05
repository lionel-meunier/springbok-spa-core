(function () {
    'use strict';

    angular.module('springbok.core').config(Translation);
    
    Translation.$inject = ['$translateProvider'];
    
    function Translation($translateProvider) {
        $translateProvider.preferredLanguage(CONFIG.app.preferredLanguage);
        $translateProvider.useMissingTranslationHandlerLog();
        $translateProvider.useSanitizeValueStrategy(null);
    }
})();

