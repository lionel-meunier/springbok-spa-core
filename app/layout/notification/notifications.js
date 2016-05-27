(function () {
    'use strict';
    
    angular.module('springbok.core').config(notifications);
    
    notifications.$inject = ['NotificationProvider'];
    
    function notifications(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 5000,
            startTop: 10,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        });
    }
})();

