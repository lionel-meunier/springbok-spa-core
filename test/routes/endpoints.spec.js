'use-strict';

describe('endpoints tests', function () {
    let endpoints;
    
    beforeEach(module('springbok.core'));
    
    beforeEach(inject(function (_endpoints_) {
        endpoints = _endpoints_;
    }));
    
    it('should add a route', function() {
        let route = 'users/manager';
        
        endpoints.add('userManager', route);
        
        expect(endpoints.get('userManager')).toEqual(route);
    });
    
    it('should add a route with params', function() {
        let route = 'users/:id/manager';
        let params = {id: 5};
        
        endpoints.add('userManager', route);
        
        expect(endpoints.get('userManager', params)).toEqual('users/5/manager');
    });
});