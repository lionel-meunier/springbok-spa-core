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
        this.set = function(search, criterias) {
            if (search !== undefined && criterias !== undefined) {
                searchCriterias[search] = criterias;
            }
        };
        
        /**
         * Returns all criterias for all search
         * @returns {{}}
         */
        this.getAll = function() {
            return searchCriterias;
        };
        
        /**
         * Returns an object "criterias" for a specific search
         * @param search
         */
        this.get = function(search) {
            return searchCriterias[search];
        };
        
        /**
         * Deletes all the criterias for a specific search
         * @param search
         */
        this.remove = function(search) {
            if (searchCriterias[search] !== undefined) {
                searchCriterias[search] = undefined;
            }
        };
        
        /**
         * Removes all search criterias
         */
        this.clear = function() {
            searchCriterias = {};
        };
    }
})();

