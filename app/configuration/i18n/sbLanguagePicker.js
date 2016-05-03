(function () {
    'use strict';
    
    angular.module('springbok.core').directive('sbLanguagePicker', sbLanguagePicker);
    
    var TEMPLATE = '<li class="green" ' +
                        'ng-controller="i18nController as i18n"> ' +
                        '<a data-toggle="dropdown" class="dropdown-toggle pointer" aria-expanded="false"> ' +
                            '<span class="user-info"> ' +
                                '<small>{{ \'I18N_LANGUAGE\' | translate}}</small> ' +
                                '{{i18n.get(authentication.session.language).i18nKey | translate}} ' +
                            '</span> ' +
                            '<i class="ace-icon fa fa-caret-down"></i> ' +
                        '</a> ' +
                        '<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close"> ' +
                            '<li ng-repeat="language in i18n.languages"> ' +
                                '<a class="pointer" ng-click="i18n.change(language.key)"> ' +
                                    '<img width="15" ng-src="assets/images/i18n/{{language.key}}.png" alt="{{language.i18nKey | translate}} flag"/> ' + 
                                    '{{language.i18nKey | translate }} ' +
                                '</a> ' +
                            '</li> ' +
                        '</ul> ' +
                    '</li>';
                
    function sbLanguagePicker() {
        return {
            restrict: 'E',
            template: TEMPLATE,
            transclude: true,
            replace: true
        };
    }
})();

