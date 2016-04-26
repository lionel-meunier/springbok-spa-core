(function () {
    'use-strict';

    const coreDependencies = ['pascalprecht.translate', 'ngSanitize', 'ngRoute'];

    const core = angular.module('springbok.core', coreDependencies);

    core.run(['endpoints', function (endpoints) {
        endpoints.add('enums', 'public/constants');
    }]);
})();
(function () {
    'use strict';

    angular.module('springbok.core').factory('httpInterceptor', httpInterceptor);

    httpInterceptor.$inject = ['$rootScope', '$q'];

    function httpInterceptor($rootScope, $q) {
        return {
            request: function (config) {
                $rootScope.$broadcast('showSpinner');
                return config || $q.when(config);
            },
            requestError: function (rejection) {
                $rootScope.$broadcast('showSpinner');
                return $q.reject(rejection);
            },
            response: function (response) {
                $rootScope.$broadcast('hideSpinner');
                return response || $q.when(response);
            },
            responseError: function (response) {
                $rootScope.$broadcast('hideSpinner');
                return response;
            }
        };
    }

    angular.module('springbok.core').config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    }]);
})();
(function () {
    'use strict';

    angular.module('springbok.core').config(Logging);

    Logging.$inject = ['$logProvider'];

    function Logging($logProvider) {
        $logProvider.debugEnabled(CONFIG.app.logDebugEnabled);
    }
})();
(function () {
    'use strict';

    angular.module('springbok.core').config(Translation);

    Translation.$inject = ['$translateProvider'];

    function Translation($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: '/i18n/',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage(CONFIG.app.preferredLanguage);
        $translateProvider.useMissingTranslationHandlerLog();
        $translateProvider.useSanitizeValueStrategy(null);
    }
})();
(function () {
    'use strict';

    angular.module('springbok.core').service('enums', enums);

    enums.$inject = ['$http', '$q', '$log', 'endpoints'];

    function enums($http, $q, $log, endpoints) {
        var isReady = false;

        this.data = {};
        this.ready = $q.defer();

        /**
         * Get all constants
         */
        this.load = function () {
            var self = this;

            if (isReady === false) {
                $http.get(endpoints.get('enums')).success(function (data) {
                    self.data = data;
                    isReady = true;
                    self.ready.resolve();
                }).error(function () {
                    $log.error('enumsService is not loaded');
                    self.ready.reject();
                });
            }
        };

        /**
         * Get ready promise
         * @return {*}
         */
        this.isReady = function () {
            return this.ready.promise;
        };
        /**
         * Get enums with name in data
         * @param enumName {String} name to enum
         * @return {*}
         */
        this.getData = function (enumName) {
            return this.data[enumName];
        };

        /**
         * Get enums with name in data
         * @param enumName {String} name to enum
         * @return {*}
         */
        this.getDataByValue = function (enumName, valueSearch) {
            var data = this.getData(enumName);
            return _.findWhere(data, { value: valueSearch });
        };
    }
})();
(function () {
    'use strict';

    angular.module('springbok.core').factory('Search', Search);

    Search.$inject = ['$log', '$q', '$http', 'pagination', 'searchCriterias'];

    function Search($log, $q, $http, pagination, searchCriterias) {
        const DEFAULT_DIRECTION = 'asc';

        var Search = function (searchConfiguration) {
            this.configuration = searchConfiguration;

            this.createColumns();
            this.initMaxPerPage();
            this.getCriterias();

            this.searched = false;

            this.results = {
                content: [],
                totalElements: 0,
                currentPage: 0
            };
        };

        Search.prototype.orderBy = function (columnName, direction) {
            this.configuration.currentOrderBy = columnName;

            if (!_.isNull(direction) && !_.isUndefined(direction)) {
                this.configuration.columns[columnName] = direction;
            } else {
                this.configuration.columns[columnName] = this.configuration.columns[columnName] === 'asc' ? 'desc' : 'asc';
            }

            this.search();
        };

        Search.prototype.maxPerPage = function (maxPerPage) {
            this.configuration.maxPerPage = maxPerPage;
        };

        /**
         * If the criteriasKey is set in the configuration, then the search criterias are stored in the session
         * @param {integer} pageNumber the page to return (starting at 1)
         * @returns {undefined}
         */
        Search.prototype.search = function (pageNumber) {
            var self = this;

            if (!_.isNull(pageNumber) && !_.isUndefined(pageNumber)) {
                self.results.currentPage = pageNumber;
            }

            var config = {
                params: {
                    direction: self.configuration.columns[self.configuration.currentOrderBy],
                    properties: self.configuration.currentOrderBy,
                    pageSize: self.configuration.maxPerPage,
                    pageNumber: self.results.currentPage
                }
            };

            if (!_.isUndefined(self.configuration.form)) {
                Object.keys(self.configuration.form).forEach(function (formField) {
                    config.params[formField] = _.isUndefined(self.configuration.form[formField]) ? null : self.configuration.form[formField];
                });
            }

            if (!_.isNull(self.configuration.criteriasKey) && !_.isUndefined(self.configuration.criteriasKey)) {
                searchCriterias.set(self.configuration.criteriasKey, config.params);
            }

            $log.debug('Search configuration for ' + this.configuration.criteriasKey, this.configuration);

            return this.fetch(config);
        };

        Search.prototype.fetch = function (config) {
            var self = this;
            var defer = $q.defer();

            $http.get(self.configuration.endpoint, config).then(function (searchData) {
                if (searchData.status === 200) {
                    self.results = searchData.data;
                    self.searched = true;
                    pagination.extendsPagedDataWithWalker(self.results);
                }

                defer.resolve(self.results);
            }, function (error) {
                defer.reject({ reason: error.status });
            });

            return defer.promise;
        };

        Search.prototype.initMaxPerPage = function () {
            if (_.isNull(this.configuration.allMaxPerPage) || _.isUndefined(this.configuration.allMaxPerPage) || _.isEmpty(this.configuration.allMaxPerPage)) {

                this.configuration.allMaxPerPage = pagination.defaultAllMaxPerPage;
            }

            if (_.isNull(this.configuration.maxPerPage) || _.isUndefined(this.configuration.maxPerPage)) {
                this.configuration.maxPerPage = _.first(pagination.defaultAllMaxPerPage);
            }
        };

        Search.prototype.createColumns = function () {
            var self = this;
            self.configuration.columns = {};

            self.configuration.columnList.forEach(function (column) {
                self.configuration.columns[column.name] = column.name !== self.configuration.currentOrderBy ? DEFAULT_DIRECTION : self.configuration.currentDirection;
            });
        };

        Search.prototype.getCriterias = function () {
            if (searchCriterias.has(this.configuration.criteriasKey)) {
                this.configuration.form = searchCriterias.get(this.configuration.criteriasKey);
            }
        };

        return Search;
    }
})();
(function () {
    'use strict';

    angular.module('springbok.core').service('pagination', pagination);

    function pagination() {
        var pagination = this;

        pagination.defaultAllMaxPerPage = [50, 100, 200, 1000, 2000];

        pagination.setDefaultAllMaxPerPage = function (defaultAllMaxPerPage) {
            pagination.defaultAllMaxPerPage = defaultAllMaxPerPage;
        };

        pagination.extendsPagedDataWithWalker = function (pagedData) {
            if (pagedData.number === 0) {
                pagedData.currentPageFrom = 1;
                pagedData.currentPageTo = pagedData.numberOfElements < pagedData.size ? pagedData.numberOfElements : pagedData.size;
            } else {
                pagedData.currentPageFrom = pagedData.number * pagedData.size + 1;
                pagedData.currentPageTo = pagedData.numberOfElements < pagedData.size ? pagedData.totalElements : pagedData.currentPageFrom - 1 + pagedData.size;
            }
        };
    }
})();
(function () {
    'use strict';

    angular.module('springbok.core').directive('sbSearchFooter', sbSearchFooter);

    var TEMPLATE = '<div class="row-fluid"' + 'ng-show="search.results.totalElements > 0">' + '<div class="span6">' + '<div class="dataTables_info">' + '{{\'SEARCH_RESULTS_CAPITALIZED\'| translate}} {{search.results.currentPageFrom}} {{\'SEARCH_TO\'| translate}} ' + '{{search.results.currentPageTo}} {{\'SEARCH_OF\'| translate}} {{search.results.totalElements}}' + '</div>' + '</div>' + '<div class="span6">' + '<uib-pagination' + 'boundary-links="true"' + 'items-per-page="configuration.maxPerPage"' + 'total-items="search.results.totalElements"' + 'ng-model="search.results.currentPage"' + 'ng-change="search.search()"' + 'class="pagination-sm"' + 'previous-text="&lsaquo;"' + 'next-text="&rsaquo;"' + 'first-text="&laquo;"' + 'last-text="&raquo;">' + '</uib-pagination>' + '</div>' + '</div>;';

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
(function () {
    'use strict';

    angular.module('springbok.core').directive('sbSearchHeader', sbSearchHeader);

    var TEMPLATE = '<div class="table-header"' + 'ng-show="search.searched">' + '{{search.results.totalElements}} {{\'SEARCH_RESULTS_LOWERCASE\' | translate}}' + '<div class="pull-right table-header-tools form-inline">' + '<label for="maxPerPage">{{\'SEARCH_MAXPERPAGE\' | translate}}</label>' + '<select id="maxPerPage"' + 'class="input-small"' + 'style="margin: 0 10px"' + 'ng-model="search.configuration.maxPerPage"' + 'ng-options="maxPerPage for maxPerPage in search.configuration.allMaxPerPage"' + 'ng-change="search.search()">' + '</select>' + '</div>' + '</div>';

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
(function () {
    'use strict';

    angular.module('springbok.core').service('searchCriterias', searchCriterias);

    function searchCriterias() {
        var searchCriterias = {};

        /**
         * Adds an object wich is criterias for a specific search
         * For example : search = 'task' - criterias = {owner: 'admin', status: 'new'}
         * @param search
         * @param criterias
         */
        this.set = function (search, criterias) {
            if (search !== undefined && criterias !== undefined) {
                searchCriterias[search] = criterias;
            }
        };

        /**
         * Returns all criterias for all search
         * @returns {{}}
         */
        this.getAll = function () {
            return searchCriterias;
        };

        /**
         * Returns true if criterias exist for this search name, false otherwise
         * @param {type} search the search name
         * @returns {Boolean} 
         */
        this.has = function (search) {
            return searchCriterias.hasOwnProperty(search);
        };

        /**
         * Returns an object "criterias" for a specific search
         * @param search
         */
        this.get = function (search) {
            return searchCriterias[search];
        };

        /**
         * Deletes all the criterias for a specific search
         * @param search
         */
        this.remove = function (search) {
            if (searchCriterias[search] !== undefined) {
                searchCriterias[search] = undefined;
            }
        };

        /**
         * Removes all search criterias
         */
        this.clear = function () {
            searchCriterias = {};
        };
    }
})();
(function () {
    'use strict';

    angular.module('springbok.core').service('endpoints', endpoints);

    endpoints.$inject = ['$log', 'urlUtils'];

    function endpoints($log, urlUtils) {
        this.apiRootPath = '';

        this.routes = {};

        /**
         * Sets the server API root path
         * @param {string} apiRootPath the server API root path
         * @returns {void}
         */
        this.setApiRootPath = function (apiRootPath) {
            this.apiRootPath = urlUtils.addSlashAtTheEndIfNotPresent(apiRootPath);
        };

        /**
         * Adds a route, example : endpoints.add('enums', '/api/public/constants')
         * @param {string} routeKey the 
         * @param {string} route
         * @returns {void}
         */
        this.add = function (routeKey, route) {
            this.routes[routeKey] = route;
        };

        /**
         * Retrieve a relative URL from a key, and process its parameters if exists
         *
         * @param routeName key of the requested route such as auth for /auth/logout
         * @param parameters path parameters example :
         * {
         *  id: value,
         *  name: value
         * }
         * for URLs like /myurl/:id/people/:name
         *
         * @returns {string} relative URL with processed parameters
         * @see routes
         */
        this.get = function (routeName, parameters) {
            var route = this.routes[routeName];

            if (s.isBlank(this.apiRootPath)) {
                $log.debug('The API root path has not been set, call setApiRootPath(apiRootPath) to set the API root path, example : endpoints.setApiRootPath(\'http://client.iocean.fr/api/\')');
            }

            return this.apiRootPath + this.processParameters(route, parameters);
        };

        /**
         * Process URL parameters
         *
         * @param route relative raw URL such as /myurl/:id/people/:name
         * @param parameters path parameters key/value object
         * @return {string} relative url with parameter placeholders replaced by values
         */
        this.processParameters = function (route, parameters) {
            return urlUtils.processUrlWithPathVariables(route, parameters, ':');
        };
    }
})();
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
(function () {
    'use strict';

    angular.module('springbok.core').filter('statusKey', statusKey);

    function statusKey() {
        return function (status) {
            if (_.isNull && _.isUndefined && status === true) {
                return 'GLOBAL_ACTIVATED';
            } else {
                return 'GLOBAL_DEACTIVATED';
            }
        };
    }
})();
(function () {
    'use strict';

    angular.module('springbok.core').service('encryptionUtils', encryptionUtils);

    function encryptionUtils() {
        this.encodeToBase64 = function (stringToEncode) {
            return window.btoa(unescape(encodeURIComponent(stringToEncode)));
        };
    }
})();
(function () {
    'use strict';

    angular.module('springbok.core').service('urlUtils', urlUtils);

    function urlUtils() {
        this.addSlashAtTheEndIfNotPresent = function (url) {
            if (!s.isBlank(url)) {
                var lastIndexOfSlash = url.lastIndexOf('/');
                var lastCharacterIsASlash = lastIndexOfSlash === url.length - 1;

                if (!lastCharacterIsASlash) {
                    url += '/';
                }
            }

            return url;
        };

        this.processUrlWithPathVariables = function (url, pathVariables, pathVariableCharacter) {
            var processedUrl = url,
                paramMatch;

            if (_.isUndefined(pathVariables) || !_.isObject(pathVariables)) {
                return processedUrl;
            }

            _.each(_.keys(pathVariables), function (key) {
                paramMatch = pathVariableCharacter + key;
                if (s.include(url, paramMatch)) {
                    processedUrl = processedUrl.replace(paramMatch, pathVariables[key]);
                }
            });

            return processedUrl;
        };
    }
})();
(function () {
    'use strict';

    angular.module('springbok.core').controller('menuController', menuController);

    menuController.$inject = ['menuItems'];

    function menuController(menuItems) {
        var menu = this;

        menu.isMinified = false;
        menu.items = menuItems.all;

        menu.collapseMenu = function () {
            menu.isMinified = !menu.isMinified;
        };

        menu.resetState = function () {
            menu.items.forEach(function (item) {
                item.isActive = false;

                if (menu.hasSubItems(item)) {
                    item.isSubMenuOpened = false;

                    item.subItems.forEach(function (subItem) {
                        subItem.isActive = false;
                    });
                }
            });
        };

        menu.hasSubItems = function (item) {
            return !_.isNull(item.subItems) && !_.isUndefined(item.subItems);
        };

        menu.toggle = function (item, parent) {
            var itemSubMenuWasNotOpened = !item.isSubMenuOpened;
            var itemHasParent = !_.isNull(parent) && !_.isUndefined(parent);

            menu.resetState();
            if (menu.hasSubItems(item)) {
                if (itemSubMenuWasNotOpened) {
                    item.isSubMenuOpened = true;
                }
            } else {
                if (itemHasParent) {
                    parent.isSubMenuOpened = true;
                }

                item.isActive = true;
            }
        };
    }
})();
(function () {
    'use strict';

    angular.module('springbok.core').service('menuItems', menuItems);

    function menuItems() {
        var menuItems = this;

        menuItems.all = [];

        menuItems.add = function (item) {
            menuItems.all.push(item);
        };
    }
})();
(function () {
    'use strict';

    angular.module('springbok.core').service('notification', notification);

    notification.$inject = ['$timeout'];

    function notification($timeout) {
        var notification = this;
        var DEFAULTS = {
            delay: 5000,
            type: 'info'
        };

        /**
         * Sets the default delay, in milliseconds, before the notification fades out.
         * @param {integer} delay the delay in milliseconds before the notification fades, 5000 milliseconds by default 
         * @returns {undefined}
         */
        notification.setDefaultDelay = function (delay) {
            DEFAULTS.delay = delay || DEFAULTS.delay;
        };

        /**
         * Displays a notification and makes it fade out after a specifific delay.
         * @param {Object} notification the a notification object {type: 'info', message: 'MY_KEY', show: true}
         * @param {integer} delay the delay in milliseconds before the notification fades out, 5000 milliseconds by default 
         */
        notification.display = function (notification, delay) {
            delay = delay || DEFAULTS.delay;

            notification.show = true;

            if (!_.isNull(notification) && !_.isUndefined(notification)) {
                $timeout(function () {
                    notification.show = false;
                }, delay);
            }
        };

        /**
         * Creates a notification from a message key and a type, info type by default.
         * @param {string} type the type of alert (info|success|warning|error)
         * @param {string} message the message key 
         * @returns a notification object {type: 'info', message: 'MY_KEY', show: true}
         */
        notification.create = function (type, message) {
            type = type || DEFAULTS.type;

            return {
                show: false,
                type: type,
                message: message
            };
        };
    }
})();
(function () {
    'use strict';

    angular.module('springbok.core').directive('sbNotification', sbNotification);

    var TEMPLATE = '<div ng-show="show" class="alert fixed-notification {{typeClass}}" style="z-index: 2000; position: fixed; width: 25%; top: 5%; right: 0.5%;">' + '<p style="float: left; width: 95%;">' + '{{message | translate}}' + '</p>' + '<button type="button" class="close" ng-click="close()" width: 5%;>' + '<i class="fa fa-times"></i>' + '</button>' + '</div>';

    function sbNotification() {
        return {
            restrict: 'E',
            template: TEMPLATE,
            transclude: true,
            replace: true,
            scope: {
                type: '@',
                message: '=',
                show: '='
            },
            link: function (scope, element, attributes) {
                scope.close = function () {
                    scope.show = false;
                };

                attributes.$observe('type', function (value) {
                    switch (value) {
                        case 'info':
                            scope.typeClass = 'alert-info';
                            break;
                        case 'success':
                            scope.typeClass = 'alert-success';
                            break;
                        case 'warning':
                            scope.typeClass = 'alert-warning';
                            break;
                        case 'error':
                            scope.typeClass = 'alert-danger';
                            break;
                        default:
                            scope.typeClass = 'alert-info';
                            break;
                    }
                });
            }
        };
    }
})();