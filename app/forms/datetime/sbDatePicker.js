(function () {
    'use strict';
    
    var TEMPLATE = '<p class="input-group"> ' +
                        '<input type="text" class="form-control" ' +
                            'ng-disabled="$ctrl.controlsDisabled" ' +
                            'ng-model="$ctrl.dateModel" ' +
                            'ng-required="$ctrl.dateRequired" ' + 
                            'name="{{$ctrl.dateFormFieldName}}" ' +
                            'placeholder="jj/mm/aaaa" ' +
                            'uib-datepicker-popup="dd/MM/yyyy" ' + 
                            'is-open="$ctrl.isOpen" ' +
                            'on-open-focus="true" ' +
                            'current-text="{{\'GLOBAL_TODAY\' | translate}}" ' +
                            'clear-text="{{\'GLOBAL_RESET\' | translate}}" ' +
                            'close-text="{{\'GLOBAL_CLOSE\' | translate}}" /> ' +
                        '<span class="input-group-btn"> ' +
                            '<button type="button" class="btn" style="padding: 2px" ' + 
                                    'ng-click="$ctrl.open()" ng-disabled="$ctrl.controlsDisabled"> ' +
                                '<i class="ace-icon fa fa-calendar-o"></i> ' +
                            '</button> ' +
                        '</span> ' +
                    '</p>' + 
                    '<div ng-messages="$ctrl.dateFormName[$ctrl.dateFormFieldName].$error"> ' +
                        '<span ng-message="date" class="form-error-red">{{\'FORM_DATEFORMAT_INVALID\' | translate}}</span> ' +
                    '</div>';
    
    function sdDatePickerController() {
        this.isOpen = false;
        this.controlsDisabled = false;
        this.dateRequired = false;
        
        this.open = function() {
            this.isOpen = true;  
        };
    }
    
    angular.module('springbok.core').component('sbDatePicker', {
        template: TEMPLATE,
        controller: sdDatePickerController,
        bindings : {
            controlsDisabled: '<',
            dateRequired: '<',
            dateModel: '=',
            dateFormName: '=',
            dateFormFieldName: '<'
        }
    });
})();

