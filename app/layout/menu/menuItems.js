(function () {
    'use strict';
    
    angular.module('springbok.core').service('menuItems', menuItems);
    
    function menuItems() {
        var menuItems = this;
        
        menuItems.all = [];
        
        menuItems.add = function(item) {
            menuItems.all.push(item);
        };
    }
})();

