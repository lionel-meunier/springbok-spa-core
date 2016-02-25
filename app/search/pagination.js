(function () {
    'use strict';

    angular.module('springbok.core').service('pagination', pagination);
    
    function pagination() {
        return {
            extendsPagedDataWithWalker: function (pagedData) {
                if (pagedData.number === 0) {
                    pagedData.currentPageFrom = 1;
                    pagedData.currentPageTo = pagedData.numberOfElements < pagedData.size ? pagedData.numberOfElements : pagedData.size;
                } else {
                    pagedData.currentPageFrom = pagedData.number * pagedData.size + 1;
                    pagedData.currentPageTo = pagedData.numberOfElements < pagedData.size ? pagedData.totalElements : pagedData.currentPageFrom - 1 + pagedData.size;
                }

            }
        };
    }
})();