(function () {
    'use strict';

    describe('SearchCriteriasService tests', function () {
        let searchCriterias;
        let SEARCH_NAME = 'TASK';
        
        beforeEach(module('springbok.core'));

        beforeEach(inject(function(_searchCriterias_) {
            searchCriterias = _searchCriterias_;
            searchCriterias.resetAllSearchCriterias();
        }));

        it('should return undefined if there is no criteria for a specific search', function () {
            expect(searchCriterias.getCriteriasForSearch(SEARCH_NAME)).toBeUndefined();
        });

        it('should add all criterias for this research, if this research doesn\'t exist', function () {
            var criterias = {user: 'test'};
            searchCriterias.addCriteriasForSearch(SEARCH_NAME, criterias);
            expect(searchCriterias.getCriteriasForSearch(SEARCH_NAME)).toEqual({user: 'test'});
        });

        it('should add replace all former criterias', function () {
            var criterias = {user: 'test'};
            searchCriterias.addCriteriasForSearch(SEARCH_NAME, criterias);
            var newCriterias = {user: 'aaa', age: 12};
            searchCriterias.addCriteriasForSearch(SEARCH_NAME, newCriterias);
            expect(searchCriterias.getCriteriasForSearch(SEARCH_NAME)).toEqual({user: 'aaa', age: 12});
        });


        it('should not add criterias if search is undefined', function () {
            var criterias = {user: 'test'};
            searchCriterias.addCriteriasForSearch(undefined, criterias);
            expect(searchCriterias.getSearchCriterias()).toEqual({});
        });

        it('should not add criterias if criterias are undefined', function () {
            searchCriterias.addCriteriasForSearch(SEARCH_NAME, undefined);
            expect(searchCriterias.getSearchCriterias()).toEqual({});
        });

        it('should reset all criterias', function () {
            var criterias = {user: 'test'};
            searchCriterias.addCriteriasForSearch(SEARCH_NAME, criterias);
            searchCriterias.resetAllSearchCriterias();
            expect(searchCriterias.getCriteriasForSearch(SEARCH_NAME)).toBeUndefined();
        });

        it('should remove all criterias for a specific search', function () {
            var criterias = {user: 'test'};
            searchCriterias.addCriteriasForSearch(SEARCH_NAME, criterias);
            searchCriterias.removeCriteriaForSearch(SEARCH_NAME);
            expect(searchCriterias.getCriteriasForSearch(SEARCH_NAME)).toBeUndefined();
        });

    });

})();
