(function () {
    'use strict';

    describe('pagination tests', function () {
        let pagination;
        
        beforeEach(module('springbok.core'));

        beforeEach(inject(function (_pagination_) {
            pagination = _pagination_;
        }));

        it('should extends a given object with pagination position', function () {
            var myPagination = {
                totalElements: 1,
                numberOfElements: 1,
                number: 1,
                size: 10
            };
            pagination.extendsPagedDataWithWalker(myPagination);
            expect(myPagination.currentPageFrom).toBeDefined();
            expect(myPagination.currentPageTo).toBeDefined();
        });

        it('should give correct position in page two for multiple pages', function () {
            var myPagination = {
                totalElements: 300,
                numberOfElements: 150,
                number: 1,
                size: 10
            };
            pagination.extendsPagedDataWithWalker(myPagination);
            expect(myPagination.currentPageFrom).toBe(11);
            expect(myPagination.currentPageTo).toBe(20);
        });

        it('should give correct position in page 4 for multiple pages', function () {
            var myPagination = {
                totalElements: 300,
                numberOfElements: 150,
                number: 3,
                size: 7
            };
            pagination.extendsPagedDataWithWalker(myPagination);
            expect(myPagination.currentPageFrom).toBe(22);
            expect(myPagination.currentPageTo).toBe(28);
        });


        it('should give correct position for nbElements < size', function () {
            var myPagination = {
                totalElements: 9,
                numberOfElements: 2,
                number: 1,
                size: 7
            };
            pagination.extendsPagedDataWithWalker(myPagination);
            expect(myPagination.currentPageFrom).toBe(8);
            expect(myPagination.currentPageTo).toBe(9);
        });



        it('should give 1 for currentPageFrom, and the value of numberOfElements if we are on the first page', function () {
            var myPagination = {
                totalElements: 501,
                numberOfElements: 50,
                number: 0,
                size: 50
            };
            pagination.extendsPagedDataWithWalker(myPagination);
            expect(myPagination.currentPageFrom).toBe(1);
            expect(myPagination.currentPageTo).toBe(50);
        });

        it('should give correct positition on the second page', function () {
            var myPagination = {
                totalElements: 501,
                numberOfElements: 50,
                number: 1,
                size: 50
            };
            pagination.extendsPagedDataWithWalker(myPagination);
            expect(myPagination.currentPageFrom).toBe(51);
            expect(myPagination.currentPageTo).toBe(100);
        });

        it('should put the same values for currentPageFrom and currentPageTo, if there is only one result at the end of the array', function () {
            var myPagination = {
                totalElements: 501,
                numberOfElements: 1,
                number: 10,
                size: 50
            };
            pagination.extendsPagedDataWithWalker(myPagination);
            expect(myPagination.currentPageFrom).toBe(501);
            expect(myPagination.currentPageTo).toBe(501);
        });
    });
})();