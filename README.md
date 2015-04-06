# hash-regex-router

Client-side hashchange regex router for [singe-page applications](http://en.wikipedia.org/wiki/Single-page_application).
Works on Chrome 5, Firefox 3.6 and IE 10+.

Routes are processed in the order they are added.

## Examples/API

Basic usage:

```javascript
route(/^about/, function() {
    console.log('Showing the About page');
});
```

With capture groups:

```javascript
route(/^profile\/([0-9]+)/, function(uid) {
    console.log('Showing the profile page for user ' + uid);
});

```

Default route:

```javascript
route(/.*/, function() {
    route.go('home');
});
```

Programmatically go to a route (#home):

```javascript
route.go('home');
```

Goes to #profile/123:

```javascript
route.go('profile', 123);
```

Refresh the current route:

```javascript
route.refresh();
```

Disable routing:

```
route.disable();
```

Re-enable routing:

```
route.enable();
```

Prevent leaving current route:

```
route.leave = function() {
    return confirm('Leave the current route?');
};
```

## AMD/CommonJS

The source `router.js` uses CommonJS module format. `dist/router-standalone.js`
contains minified build in UMD format that supports both AMD and CommonJS environments and also
sets global `route` when directly in browser.

Installing from NPM:

    npm install hash-regex-router

If installed through NPM then the module can be directly used in browserify by simply require()'ing
it:

    var route = require('router');

## Building/testing

Install build dependencies:

    npm install

Run static server:

    make serve-test

Run tests:

    make test

## License

The MIT license.
