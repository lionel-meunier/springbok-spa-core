'use-strict';

describe('enums tests', function () {
    let enums, $httpBackend;
    
    beforeEach(module('springbok.core'));
    
    beforeEach(inject(function (_enums_, _$httpBackend_) {
        enums = _enums_;
        $httpBackend = _$httpBackend_;
    }));
    
    it('should load', function() {
        let mockEnums = {
            EnumMock: [
                {lang: 'value 1', value: 'VALUE1'},
                {lang: 'value 2', value: 'VALUE2'}
            ]
        };
        
        $httpBackend.when('GET', 'public/constants').respond(200, mockEnums);
        enums.load();
        $httpBackend.flush();
        
        expect(enums.getData('EnumMock')).toEqual(mockEnums.EnumMock);
    });
});