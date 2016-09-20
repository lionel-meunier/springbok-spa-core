(function () {
    'use strict';
    
    angular.module('springbok.core').factory('Search', Search);

    Search.$inject = ['$log', '$q', '$http', 'pagination', 'searchCriterias'];
    
    function Search($log, $q, $http, pagination, searchCriterias) {
        
        var DIRECTION_ASC = 'asc';
        var DIRECTION_DESC = 'desc';
        var DEFAULT_DIRECTION = 'asc';

        var Search = function(searchConfiguration) {
            this.configuration = searchConfiguration;

            this.createColumns();
            this.initMaxPerPage();

            this.searched = false;

            this.results = {
                content: [],
                totalElements: 0,
                currentPage: 1
            };
        };

        Search.prototype.orderBy = function (columnName, direction) {
            this.configuration.currentOrderBy = columnName;
            this.setDirectionFor(columnName, direction);
            this.configuration.currentDirection = this.configuration.columns[columnName];

            this.search();
        };
        
        Search.prototype.setDirectionFor = function(columnName, direction) {
            var self = this;
            
            if (!_.isNull(direction) && !_.isUndefined(direction)){
                this.configuration.columns[columnName] = direction;
            } else {
                this.configuration.columns[columnName] = this.configuration.columns[columnName] === DIRECTION_ASC ? DIRECTION_DESC : DIRECTION_ASC;
            }
            
            Object.keys(this.configuration.columns, function(columnKey) {
                if (columnKey !== columnName) {
                    self.configuration.columns[columnKey] = DEFAULT_DIRECTION;
                }
            });
        };

        Search.prototype.maxPerPage = function(maxPerPage) {
            this.configuration.maxPerPage = maxPerPage;
        };

        /**
         * If the criteriasKey is set in the configuration, then the search criterias are stored in the session
         * @param {integer} pageNumber the page to return (starting at 1)
         * @returns {undefined}
         */
        Search.prototype.search = function(pageNumber) {
            var self = this;
            
            if (!_.isNull(pageNumber) && !_.isUndefined(pageNumber)) {
                self.results.currentPage = pageNumber;
            }
            
            var config = this.buildCriterias();
            
            if (!_.isNull(self.configuration.criteriasKey) && !_.isUndefined(self.configuration.criteriasKey)) {
                searchCriterias.set(self.configuration.criteriasKey, config.params);
            }

            $log.debug('Search configuration for ' + this.configuration.criteriasKey, this.configuration);

            return this.fetch(config);
        };

        Search.prototype.buildCriterias = function() {
            var self = this;
            
            var config = {
                params: {}
            };
            
            if (!_.isUndefined(self.configuration.form)) {
                Object.keys(self.configuration.form).forEach(function(formField) {
                    config.params[formField] = _.isUndefined(self.configuration.form[formField]) ? null : self.configuration.form[formField];
                });
            } else if (!self.configuration.form) {
                self.configuration.form = {};
            }
            
            if (!self.configuration.form.direction) {
                config.params.direction = self.configuration.currentDirection;
            } else {
                self.configuration.currentDirection = self.configuration.form.direction;
                delete self.configuration.form.direction;
            }
            
            if (!self.configuration.form.properties) {
                config.params.properties = self.configuration.currentOrderBy;
            } else {
                self.configuration.currentOrderBy = self.configuration.form.properties;
                delete self.configuration.form.properties;
            }
            
            if (!self.configuration.form.pageSize) {
                config.params.pageSize = self.configuration.maxPerPage;
            } else {
                self.configuration.maxPerPage = self.configuration.form.pageSize;
                delete self.configuration.form.pageSize;
            }
            
            if (!self.configuration.form.pageNumber) {
                config.params.pageNumber = self.results.currentPage - 1;
            } else {
                delete self.configuration.form.pageNumber;
            }
            
            self.configuration.columns[config.params.properties] = config.params.direction;
            
            this.setDirectionFor(config.params.properties, config.params.direction);
            
            return config;
        };

        Search.prototype.fetch = function(config) {
            var self = this;
            var defer = $q.defer();

            $http.get(self.configuration.endpoint, config).then(function(searchData) {
                if (searchData.status === 200) {
                    self.results = searchData.data;
                    self.results.currentPage = config.params.pageNumber + 1;
                    self.searched = true;
                    pagination.extendsPagedDataWithWalker(self.results);
                }

                defer.resolve(self.results);
            }, function(error) {
                defer.reject({reason: error.status});
            });

            return defer.promise;
        };

        Search.prototype.initMaxPerPage = function() {
            if (_.isNull(this.configuration.allMaxPerPage) 
                || _.isUndefined(this.configuration.allMaxPerPage) 
                || _.isEmpty(this.configuration.allMaxPerPage)) {

                this.configuration.allMaxPerPage = pagination.defaultAllMaxPerPage;
            }

            if (_.isNull(this.configuration.maxPerPage) || _.isUndefined(this.configuration.maxPerPage)) {
                this.configuration.maxPerPage = _.first(pagination.defaultAllMaxPerPage);
            }
        };

        Search.prototype.createColumns = function() {
            var self = this;
            self.configuration.columns = {};

            self.configuration.columnList.forEach(function(column) {
                self.configuration.columns[column.name] = 
                    column.name !== self.configuration.currentOrderBy ? 
                    DEFAULT_DIRECTION :
                    self.configuration.currentDirection;
            });
        };
            
        return Search;
    }
})();

