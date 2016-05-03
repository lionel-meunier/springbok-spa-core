(function () {
    'use strict';

    angular.module('springbok.core').controller('i18nController', i18nController);
    
    i18nController.$inject = ['$translate', 'languages', 'session'];
    
    function i18nController($translate, languages, session) {
        var i18n = this;
        
        i18n.languages = languages.list;
        
        i18n.change = function(languageKey) {
            if (languages.has(languageKey)) {
                $translate.use(languageKey);
                session.setLanguage(languageKey);
            }
        };
        
        i18n.get = function(languageKey) {
            return languages.get(languageKey);
        };
        
        i18n.change(session.language);
    }
})();

