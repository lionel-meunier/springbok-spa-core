(function () {
    'use strict';
  
    angular.module('springbok.core').service('notification', notification);
  
    notification.$inject = ['$timeout'];
  
    function notification($timeout) {
        var notification = this;
        var DEFAULTS = {
            delay: 5000,
            type: 'info'
        };
        
        /**
         * Sets the default delay, in milliseconds, before the notification fades out.
         * @param {integer} delay the delay in milliseconds before the notification fades, 5000 milliseconds by default 
         * @returns {undefined}
         */
        notification.setDefaultDelay = function(delay) {
            DEFAULTS.delay = delay || DEFAULTS.delay;
        };
        
        /**
         * Displays a notification and makes it fade out after a specifific delay.
         * @param {Object} notification the a notification object {type: 'info', message: 'MY_KEY', show: true}
         * @param {integer} delay the delay in milliseconds before the notification fades out, 5000 milliseconds by default 
         */
        notification.display = function(notification, delay) {
            delay = delay || DEFAULTS.delay;
            
            notification.show = true;
            
            if (!_.isNull(notification) && !_.isUndefined(notification))  {
                $timeout(function() {
                    notification.show = false;
                }, delay);
            }
        };
        
        /**
         * Creates a notification from a message key and a type, info type by default.
         * @param {string} type the type of alert (info|success|warning|error)
         * @param {string} message the message key 
         * @returns a notification object {type: 'info', message: 'MY_KEY', show: true}
         */
        notification.create = function(type, message) {
            type = type || DEFAULTS.type;
            
            return {
                show: false,
                type: type,
                message: message
            };
        };
    }
})();