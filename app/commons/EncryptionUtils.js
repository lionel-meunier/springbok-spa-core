(function () {
    'use strict';
    
    angular.module('springbok.core').service('encryptionUtils', encryptionUtils);
    
    function encryptionUtils() {
        this.encodeToBase64 = function(stringToEncode) {
            return window.btoa(unescape(encodeURIComponent(stringToEncode)));
        };
    }
})();

