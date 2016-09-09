(function () {
    'use strict';

    angular.module('springbok.core').component('sbMessages', {
        controller: sbMessagesController,
        template: '<div ng-if="$ctrl.bindingResult && $ctrl.parse().length!=0"' +
        'class=" alert alert-danger" ' +
        'ng-class="$ctrl.field ? \'form-error-red\' : \'help-inline\'">' +
        '<i ng-if="!$ctrl.field" class="ace-icon fa fa-exclamation-triangle fa-lg"></i> ' +
        '<span ng-repeat="message in $ctrl.parse() track by $index">{{message}}</span>' +
        '</div>',
        bindings: {
            bindingResult: '<',
            field: '@'
        }
    });

    function sbMessagesController() {
        var self = this;
        this.parse = function () {
            return this.bindingResult
                .filter(function (br) {
                    return br.field == self.field;
                })
                .map(function (br) {
                    return br.defaultMessage ? br.defaultMessage : br.code;
                });
        };
    }
})();