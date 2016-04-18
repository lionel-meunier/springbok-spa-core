(function () {
    'use strict';

    angular.module('springbok.core').service('navigation', navigation);

    navigation.$inject = ['$rootScope', '$location', '$route'];

    function navigation($rootScope, $location) {
        var navigation = this;
        
        navigation.auth = false;
        
        navigation.currentPage = {
            titleKey: '',
            sectionKey: '',
            subSectionKey: '',
            breadcrumbsUrl: ''
        };
        
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            var url = $location.absUrl();
            $rootScope.$broadcast('handleMenuSelection', {url: url});
            navigation.updateView(current);
            navigation.handleError(current.templateUrl, previous);
        });

        navigation.updateView = function (current) {
            navigation.handlePageInfos(current);
        };
        
        navigation.handlePageInfos = function (pageObject) {
            if (!_.isUndefined(pageObject) && !_.isUndefined(pageObject.titleKey)) {
                navigation.currentPage.titleKey = pageObject.titleKey;
                navigation.currentPage.sectionKey = pageObject.sectionKey;
                navigation.currentPage.subSectionKey = pageObject.subSectionKey;
                navigation.currentPage.breadcrumbsUrl = pageObject.breadcrumbsUrl;
            } else {
                navigation.currentPage.titleKey = '';
                navigation.currentPage.sectionKey = '';
                navigation.currentPage.subSectionKey = '';
                navigation.currentPage.breadcrumbsUrl = '';
            }
        };
        
        navigation.handleError = function (currentPageUrl, previousPage) {
            if (s.include(currentPageUrl, '404.html') || s.include(currentPageUrl, '500.html')) {
                navigation.handlePageInfos(previousPage);
            }
        };
    }
})();