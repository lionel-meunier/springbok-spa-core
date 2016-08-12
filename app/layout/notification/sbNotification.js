(function () {
    'use strict';

    angular.module('springbok.core').directive('sbNotification', sbNotification);
    
    var TEMPLATE = '<div ng-show="show" class="alert fixed-notification {{typeClass}}" style="z-index: 2000; position: fixed; width: 25%; top: 5%; right: 0.5%;">' +
                        '<p style="float: left; width: 95%;">' +
                        '   <span ng-if="raw">message</span>' +
                        '   <span ng-if="!raw">{{message | translate}}</span>' +
                        '</p>' +
                        '<button type="button" class="close" ng-click="close()" width: 5%;>' +
                            '<i class="fa fa-times"></i>' +
                        '</button>' +
                    '</div>';
    
    function sbNotification() {
        return {
            restrict: 'E',
            template: TEMPLATE,
            transclude: true,
            replace: true,
            scope: {
                type: '@',
                raw: '=',
                message: '=',
                show: '='
            },
            link: function (scope, element, attributes) {
                scope.close = function() {
                    scope.show = false;
                };
                
                attributes.$observe('type', function(value) {
                    switch(value) {
                    case 'info' : scope.typeClass = 'alert-info';
                        break;
                    case 'success' : scope.typeClass = 'alert-success';
                        break;
                    case 'warning' : scope.typeClass = 'alert-warning';
                        break;
                    case 'error' : scope.typeClass = 'alert-danger';
                        break;
                    default : scope.typeClass = 'alert-info';
                        break;
                    }
                });

            }
        };
    }
})();