casper.test.begin('Router', function suite(test) {

    casper.start('http://localhost:9090/example/', function() {

        test.assertTitle('Router example');

        test.assertUrlMatch(/#home$/);
    });

    casper.thenClick('#menu li:nth-child(2) a');

    casper.waitForUrl(/#about$/);

    casper.then(function() {

        test.assertSelectorHasText('#page-about p', 'This is the about page.');
    });

    casper.thenClick('#menu li:nth-child(3) a');

    casper.waitForUrl(/#profile\/123$/);

    casper.then(function() {

        test.assertSelectorHasText('#page-profile p', 'You are watching a profile.');
    });

    casper.thenClick('#page-profile a:nth-of-type(1)');

    casper.waitForUrl(/#profile\/122$/);

    casper.then(function() {

        test.assertSelectorHasText('#page-profile p', 'You are watching a profile.');
    });

    casper.thenOpen('http://localhost:9090/example/#profile\/125');

    casper.waitForUrl(/#profile\/125$/);

    casper.then(function() {

        test.assertSelectorHasText('#page-profile p', 'You are watching a profile.');
    });

    casper.thenClick('#menu li:nth-child(4) a');

    casper.waitForUrl(/#profile\/123\/edit$/);

    casper.then(function() {

        test.assertSelectorHasText('#page-profile-edit p', 'Here could be a form.');
    });

    // Make confirmation dialog return false.

    casper.removeAllFilters('page.confirm');

    casper.setFilter('page.confirm', function(message) {

        return false;
    });

    casper.thenClick('#menu li:nth-child(1) a');

    casper.then(function() {

        test.assertSelectorHasText('#page-profile-edit p', 'Here could be a form.');
    });

    // Make confirmation dialog return true.

    casper.removeAllFilters('page.confirm');

    casper.setFilter('page.confirm', function(message) {

        return true;
    });

    casper.thenClick('#menu li:nth-child(2) a');

    casper.waitForUrl(/#about$/);

    casper.then(function() {

        test.assertSelectorHasText('#page-about p', 'This is the about page.');
    });

    casper.run(function() {

        test.done();
    });
});
