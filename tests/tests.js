// Set up testing routes.

var aboutCount = 0;

route(/^about/, function() {
    aboutCount++;
});

var profileCount = 0;
var lastProfile = 0;

route(/^profile\/([0-9]+)/, function(id) {
    profileCount++;
    lastProfile = parseInt(id, 10);
});

// The default route is
// at the bottom.

var defCount = 0;

route(/.*/, function() {
    defCount++;
});

// Test them.

describe('Route', function() {
    
    it('should visit the default route at start', function() {
        assert.equal(defCount, 1);
    });
    
    it('should not visit the about route at start', function() {
        assert.equal(aboutCount, 0);
    });
    
    it('should visit the about route when hash changes', function(done) {
        var c = aboutCount;
        window.location.hash = '#about';
        setTimeout(function() {
            assert.equal(aboutCount, c + 1);
            done();
        }, 10);        
    });
    
    it('should visit the default route when hash changes to non-existent route', function(done) {
        var c = defCount;
        window.location.hash = '#notexists';
        setTimeout(function() {
            assert.equal(defCount, c + 1);
            done();
        }, 10);
    });
    
    it('should visit the about route when used programmatically', function(done) {
        var c = aboutCount;
        route.go('about');
        setTimeout(function() {
            assert.equal(aboutCount, c + 1);
            done();
        }, 10);
    });
    
    it('should visit the profile route', function(done) {
        var c = profileCount;
        window.location.hash = '#profile/123';
        setTimeout(function() {
            assert.equal(profileCount, c + 1);
            assert.equal(lastProfile, 123);
            done();
        }, 10);
    });
    
    it('should visit the profile route programmatically', function(done) {
        var c = profileCount;
        route.go('profile/321');
        setTimeout(function() {
            assert.equal(profileCount, c + 1);
            assert.equal(lastProfile, 321);
            done();
        }, 10);
    });
    
    it('should visit the profile route programmatically with args', function(done) {
        var c = profileCount;
        route.go('profile', 231);
        setTimeout(function() {
            assert.equal(profileCount, c + 1);
            assert.equal(lastProfile, 231);
            done();
        }, 10);
    });
});
