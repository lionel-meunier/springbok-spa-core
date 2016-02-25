(function () {
    'use strict';

    angular.module('springbok.core').service('searchCriterias', searchCriterias);

    function searchCriterias() {
        var searchCriterias = {};

        /**
         * Return all criterias for all search
         * @returns {{}}
         */
        this.getSearchCriterias = function() {
            return searchCriterias;
        };
        /**
         * Return an object "criterias" for a specific search
         * @param search
         */
        this.getCriteriasForSearch = function(search) {
            return searchCriterias[search];
        };
        /**
         * Add an object wich is criterias for a specific search
         * For example : search = 'task' - criterias = {owner: 'admin', status: 'new'}
         * @param search
         * @param criterias
         */
        this.addCriteriasForSearch = function(search, criterias) {
            if (search !== undefined && criterias !== undefined) {
                searchCriterias[search] = criterias;
            }
        };
        /**
         * Remove all search criterias
         */
        this.resetAllSearchCriterias = function() {
            searchCriterias = {};
        };
        /**
         * Delete all the criterias for a specific search
         * @param search
         */
        this.removeCriteriaForSearch = function(search) {
            if (searchCriterias[search] !== undefined) {
                searchCriterias[search] = undefined;
            }
        };
    }
})();

