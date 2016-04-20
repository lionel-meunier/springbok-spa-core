(function() {
    'use strict';
    
    angular.module('springbok.core').controller('menuController', menuController);
    
    menuController.$inject = ['menuItems'];
    
    function menuController(menuItems) {
        var menu = this;
        
        menu.isMinified = false;
        menu.items = menuItems.all;
        
        menu.collapseMenu = function () {
            menu.isMinified = !menu.isMinified;
        };
        
        menu.resetState = function() {
            menu.items.forEach(function(item) {
                item.isActive = false;
                
                if (menu.hasSubItems(item)) {
                    item.isSubMenuOpened = false;
                    
                    item.subItems.forEach(function(subItem) {
                        subItem.isActive = false;
                    });
                }
            });
        };
        
        menu.hasSubItems = function(item) {
            return !_.isNull(item.subItems) && !_.isUndefined(item.subItems);
        };
        
        menu.toggle = function(item, parent) {
            var itemSubMenuWasNotOpened = !item.isSubMenuOpened;
            var itemHasParent = !_.isNull(parent) && !_.isUndefined(parent);
            
            menu.resetState();
            if (menu.hasSubItems(item)) {
                if (itemSubMenuWasNotOpened) {
                    item.isSubMenuOpened = true;
                }
            } else {
                if (itemHasParent) {
                    parent.isSubMenuOpened = true;
                }
                
                item.isActive = true;
            }
        };
    }
})();

