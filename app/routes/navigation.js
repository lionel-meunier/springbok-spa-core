(function () {
    'use strict';

    angular.module('springbok.core').service('navigation', navigation);

    function navigation() {
        var navigation = this;
        
        navigation.auth = false;
        
        init();
        
        navigation.routeChange = function (current, previous) {
            navigation.updateView(current);
            navigation.handleError(current.templateUrl, previous);
        };

        navigation.updateView = function (current) {
            navigation.handlePageInfos(current);
        };
        
        navigation.handlePageInfos = function (pageObject) {
            if (!_.isUndefined(pageObject) && !_.isUndefined(pageObject.htmlTitleKey)) {
                navigation.currentPage.htmlTitleKey = pageObject.htmlTitleKey;
                navigation.currentPage.breadcrumbsSectionKey = pageObject.breadcrumbsSectionKey;
                navigation.currentPage.breadcrumbsSubSectionKey = pageObject.breadcrumbsSubSectionKey;
                navigation.currentPage.breadcrumbsUrl = pageObject.breadcrumbsUrl;
                navigation.currentPage.headerKey = pageObject.headerKey;
                navigation.currentPage.subHeaderKey = pageObject.subHeaderKey;
            } else {
                init();
            }
        };
        
        navigation.handleError = function (currentPageUrl, previousPage) {
            if (s.include(currentPageUrl, '404.html') || s.include(currentPageUrl, '500.html')) {
                navigation.handlePageInfos(previousPage);
            }
        };
        
        function init() {
            navigation.currentPage = {
                htmlTitleKey: '',
                breadcrumbsSectionKey: '',
                breadcrumbsSubSectionKey: '',
                breadcrumbsUrl: '',
                headerKey: '',
                subHeaderKey: ''
            };  
        }
    }
})();