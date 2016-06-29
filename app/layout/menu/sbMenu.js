(function () {
    'use strict';

    angular.module('springbok.core').directive('sbMenu', sbMenu);
    
    var TEMPLATE = '<div ng-controller="menuController as menu">' +
                        '<div ng-if="showLogo" class="sidebar-shortcuts-large text-center">' +
                            '<a ng-href="#/">' +
                                '<img src="assets/images/logo.png" width="100" alt="Logo"/>' +
                            '</a>' +
                        '</div>' +
                        '<div ng-if="showLogo" class="sidebar-shortcuts-mini text-center">' +
                            '<a ng-href="#/">' +
                                '<img src="assets/images/logo.png" width="30" alt="Logo"/>' +
                            '</a>' +
                        '</div>' + 
                        '<ul class="nav nav-list">' +
                            '<li ng-repeat="item in menu.items" ' + 
                                'ng-if="item.isAuthorized" ' +
                                'ng-class="{\'active\' : item.isActive}">' +
                                '<!-- Items without submenu -->' +
                                '<a ng-href="{{item.url}}" class="pointer" ' +
                                   'ng-if="!menu.hasSubItems(item)" ' +
                                   'ng-click="menu.toggle(item)" ' +
                                   'ng-class="[item.cssClass, item.backgroundCssClass]">' +
                                    '<i class="menu-icon fa" ng-class="item.icon"></i>' +
                                    '<span class="menu-text">{{item.labelKey | translate}}</span>' +
                                '</a>' +
                                '<!-- Items with submenu -->' +
                                '<a class="pointer" ' +
                                   'ng-if="menu.hasSubItems(item)" ' +
                                   'ng-click="menu.toggle(item)" ' +
                                   'ng-class="[item.cssClass, item.backgroundCssClass]">' +
                                    '<i class="menu-icon fa" ng-class="item.icon"></i>' +
                                    '<span class="menu-text">{{item.labelKey | translate}}</span>' +
                                    '<b class="arrow fa fa-angle-down"></b>' +
                                '</a>' +
                                '<ul class="submenu" ' +
                                    'ng-class="{\'nav-hide\' : !item.isSubMenuOpened, \'nav-show\' : item.isSubMenuOpened}">' +
                                    '<li ng-repeat="subItem in item.subItems" ' +
                                        'ng-if="subItem.isAuthorized" ' +
                                        'ng-class="{\'active\' : subItem.isActive}">' +
                                        '<a ng-href="{{subItem.url}}" class="pointer" ' +
                                            'ng-click="menu.toggle(subItem, item)" ' +
                                            'ng-class="[subItem.cssClass, subItem.backgroundCssClass]">' +
                                            '<i class="menu-icon fa fa-angle-double-right"></i>' +
                                            '<span class="menu-text">{{subItem.labelKey | translate}}</span>' +
                                        '</a>' +
                                '</ul>' +
                            '</li>' +
                        '</ul>' +
                        '<div id="sidebar-collapse" class="sidebar-toggle sidebar-collapse" ' +
                             'ng-click="menu.collapseMenu()">' +
                            '<i id="sidebar-toggle-icon" class="ace-icon fa fa-angle-double-left" ' +
                               'ng-class="{\'fa-angle-double-right\' : menu.isMinified, \'fa-angle-double-left\' : !isMinified}"></i>' +
                        '</div>' +
                    '</div>';

    
    function sbMenu() {
        return {
            restrict: 'E',
            template: TEMPLATE,
            transclude: true,
            replace: true,
            link: function(scope, element, attributes) {
                if (attributes.showLogo === 'false') {
                    scope.showLogo = false;
                } else {
                    scope.showLogo = true;
                }
            }
        }; 
    }
})();

