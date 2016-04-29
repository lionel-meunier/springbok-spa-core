(function () {
    'use strict';

    angular.module('springbok.core').directive('sbSearchHeader', sbSearchHeader);
    
    var TEMPLATE = '<div class="table-header" style="margin-top: 1%"' +  
                        'ng-show="search.searched">' +
                       '{{search.results.totalElements}} {{\'SEARCH_RESULTS_LOWERCASE\' | translate}}' +
                       '<div class="pull-right table-header-tools form-inline">' +
                           '<label for="maxPerPage">{{\'SEARCH_MAXPERPAGE\' | translate}}</label>' +
                           '<select id="maxPerPage"' +
                                   'class="input-small"' +
                                   'style="margin: 0 10px"' +
                                    'ng-model="search.configuration.maxPerPage"' + 
                                   'ng-options="maxPerPage for maxPerPage in search.configuration.allMaxPerPage"' +
                                   'ng-change="search.search()">' +
                           '</select>' +
                       '</div>' +
                   '</div>';
    
    function sbSearchHeader() {
        return {
            restrict: 'E',
            template: TEMPLATE,
            transclude: true,
            replace: true,
            scope: {
                search: '='
            }
        };
    }
})();