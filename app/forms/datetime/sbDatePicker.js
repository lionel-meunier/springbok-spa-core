(function () {
    'use strict';
    
    var TEMPLATE = '<p class="input-group"> ' +
                        '<input type="text" class="form-control" sb-date-picker-validation ' +
                            'ng-model="$ctrl.dateModel" ' +
                            'ng-required="{{$ctrl.dateRequired}}" ' + 
                            'name="{{$ctrl.dateFormName}}" ' +
                            'placeholder="jj/mm/aaaa" ' +
                            'uib-datepicker-popup="{{$ctrl.dateFormat}}" ' + 
                            'is-open="$ctrl.isOpen" ' +
                            'on-open-focus="true" ' +
                            'current-text="{{\'GLOBAL_TODAY\' | translate}}" ' +
                            'clear-text="{{\'GLOBAL_RESET\' | translate}}" ' +
                            'close-text="{{\'GLOBAL_CLOSE\' | translate}}" /> ' +
                        '<span class="input-group-btn"> ' +
                            '<button type="button" class="btn" style="padding: 2px" ' + 
                                    'ng-click="$ctrl.open()"> ' +
                                '<i class="ace-icon fa fa-calendar-o"></i> ' +
                            '</button> ' +
                        '</span> ' +
                    '</p>';
    
    function sdDatePickerController() {
        this.isOpen = false;
        
        this.open = function() {
            this.isOpen = true;  
        };
    }
    
    angular.module('springbok.core').component('sbDatePicker', {
        template: TEMPLATE,
        controller: sdDatePickerController,
        bindings : {
            dateFormat: '<',
            dateRequired: '<',
            dateModel: '=',
            dateFormName: '<'
        }
    });
})();

