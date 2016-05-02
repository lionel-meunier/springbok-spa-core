(function () {
    'use strict';

    angular.module('springbok.core').directive('sbSearchFooter', sbSearchFooter);
    
    var TEMPLATE = '<div class="row"' +
                        'ng-show="search.results.totalElements > 0">' +
                       '<div class="col-sm-6">' +
                           '<div class="dataTables_info">' +
                               '{{\'SEARCH_RESULTS_CAPITALIZED\'| translate}} {{search.results.currentPageFrom}} {{\'SEARCH_TO\'| translate}} ' +
                               '{{search.results.currentPageTo}} {{\'SEARCH_OF\'| translate}} {{search.results.totalElements}}' +
                           '</div>' +
                       '</div>' +
                       '<div class="col-sm-6">' +
                           '<uib-pagination ' +
                               'boundary-links="true" ' +
                               'items-per-page="search.configuration.maxPerPage" ' +
                               'total-items="search.results.totalElements" ' +
                               'ng-model="search.results.currentPage" ' +
                               'ng-change="search.search()" ' +
                               'class="pull-right pagination-sm" ' +
                               'previous-text="&lsaquo;" ' + 
                               'next-text="&rsaquo;" ' +
                               'first-text="&laquo;" ' +
                               'last-text="&raquo;">' +
                           '</uib-pagination>' +
                       '</div>' +
                   '</div>;';
        
    function sbSearchFooter() {
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