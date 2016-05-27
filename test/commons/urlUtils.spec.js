'use-strict';

describe('urlUtils tests', function () {
    let urlUtils;
    
    beforeEach(module('springbok.core'));
    
    beforeEach(inject(function(_urlUtils_) {
        urlUtils = _urlUtils_;
    }));
    
    it('should add a slash at the end of an url if not present', function () {
        let urlWithoutSlash = 'http://iocean.fr/api';
        let result = urlUtils.addSlashAtTheEndIfNotPresent(urlWithoutSlash);
        
        expect(result).toEqual('http://iocean.fr/api/');
    });
    
    it('should not add a slash at the end of an url if already present', function () {
        let urlWithSlash = 'http://iocean.fr/api/';
        let result = urlUtils.addSlashAtTheEndIfNotPresent(urlWithSlash);
        
        expect(result).toEqual(urlWithSlash);
    });
    
    it('should process the parameter if present', function() {
        let url = 'users/:id/manager';
        let params = {id: 5};
        let result = urlUtils.processUrlWithPathVariables(url, params, ':');
        
        expect(result).toEqual('users/5/manager');
    });
});