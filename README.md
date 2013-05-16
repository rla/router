router
======

Simplest client-side hashchange regex router for [singe-page applications](http://en.wikipedia.org/wiki/Single-page_application).
Works on Chrome 5, Firefox 3.6 and IE 8.

Routes are processed in the order they are added.

Examples
--------

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

Programmatically go to a page:

```javascript
route.go('home');
```

License
-------

The MIT license.

```
Copyright (c) 2013 Raivo Laanemets

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
```
