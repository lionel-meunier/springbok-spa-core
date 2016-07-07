(function () {
    'use strict';

    describe('SearchCriteriasService', function () {
        let searchCriterias;
        let SEARCH_NAME = 'TASK';
        
        beforeEach(module('springbok.core'));

        beforeEach(inject(function(_searchCriterias_) {
            searchCriterias = _searchCriterias_;
            searchCriterias.clear();
        }));

        it('should return undefined if there is no criteria for a specific search', function () {
            expect(searchCriterias.get(SEARCH_NAME)).toBeUndefined();
        });

        it('should add all criterias for this research, if this research doesn\'t exist', function () {
            var criterias = {user: 'test'};
            searchCriterias.set(SEARCH_NAME, criterias);
            expect(searchCriterias.get(SEARCH_NAME)).toEqual({user: 'test'});
        });

        it('set should replace all former criterias', function () {
            var criterias = {user: 'test'};
            searchCriterias.set(SEARCH_NAME, criterias);
            var newCriterias = {user: 'aaa', age: 12};
            searchCriterias.set(SEARCH_NAME, newCriterias);
            expect(searchCriterias.get(SEARCH_NAME)).toEqual({user: 'aaa', age: 12});
        });


        it('should not add criterias if search is undefined', function () {
            var criterias = {user: 'test'};
            searchCriterias.set(undefined, criterias);
            expect(searchCriterias.get()).toEqual(undefined);
        });

        it('should not add criterias if criterias are undefined', function () {
            searchCriterias.set(SEARCH_NAME, undefined);
            expect(searchCriterias.get()).toEqual(undefined);
        });

        it('should reset all criterias', function () {
            var criterias = {user: 'test'};
            searchCriterias.set(SEARCH_NAME, criterias);
            searchCriterias.clear();
            expect(searchCriterias.get(SEARCH_NAME)).toBeUndefined();
        });

        it('should remove all criterias for a specific search', function () {
            var criterias = {user: 'test'};
            searchCriterias.set(SEARCH_NAME, criterias);
            searchCriterias.remove(SEARCH_NAME);
            expect(searchCriterias.get(SEARCH_NAME)).toBeUndefined();
        });

    });

})();
