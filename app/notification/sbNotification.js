(function () {
    'use strict';

    angular.module('springbok.core').directive('sbNotification', ioNotification);
    
    var TEMPLATE = '<div ng-show="show" class="alert fixed-notification {{typeClass}}" style="z-index: 2000; position: fixed; width: 25%; top: 5%; right: 0.5%;">' +
                        '<p style="float: left; width: 95%;">' +
                        '{{message | translate}}' +
                        '</p>' +
                        '<button type="button" class="close" ng-click="close()" width: 5%;>' +
                            '<i class="fa fa-times"></i>' +
                        '</button>' +
                    '</div>';
    
    function ioNotification() {
        return {
            restrict: 'E',
            template: TEMPLATE,
            transclude: true,
            replace: true,
            scope: {
                type: '=',
                message: '=',
                show: '='
            },
            link: function (scope) {
                scope.show = true;
                
                scope.close = function() {
                    scope.show = false;
                };
                
                switch(scope.type) {
                case 'info' : scope.typeClass = 'alert-info';
                    break;
                case 'success' : scope.typeClass = 'alert-success';
                    break;
                case 'warning' : scope.typeClass = 'alert-warning';
                    break;
                case 'error' : scope.typeClass = 'alert-danger';
                    break;
                default : scope.typeClass = 'alert-info';
                }
            }
        };
    }
})();