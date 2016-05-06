(function () {
    'use strict';

    angular.module('springbok.core').config(Translation);
    
    Translation.$inject = ['$translateProvider'];
    
    function Translation($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage(CONFIG.app.preferredLanguage);
        $translateProvider.useMissingTranslationHandlerLog();
        $translateProvider.useSanitizeValueStrategy(null);
    }
})();

