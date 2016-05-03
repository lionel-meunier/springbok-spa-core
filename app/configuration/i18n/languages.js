(function () {
    'use strict';

    angular.module('springbok.core').service('languages', languages);
    
    function languages() {
        var languages = this;
        
        languages.list = [
            {key: 'fr_FR', i18nKey: 'I18N_FRENCH'}
        ];
        
        languages.add = function(languageKey, languageI18nKey) {
            languages.list.push({key: languageKey, i18nKey: languageI18nKey});
        };
        
        languages.get = function(languageKey) {
            return _.findWhere(languages.list, {key: languageKey});
        };
        
        languages.has = function(languageKey) {
            return !_.isUndefined(languages.get(languageKey));
        };
        
        languages.clear = function() {
            languages.list = [];
        };
    }
})();

