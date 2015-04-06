// Simplest hashchange router.
// Chrome 5, Firefox 3.6, IE 9.
// (c) Raivo Laanemets 2013-2015
// MIT license.

var routes = [];

// Sets up a route.

var route = module.exports = function(regexp, cb) {

    if (!(regexp instanceof RegExp)) {

        throw new Error('Route must be a regexp.');
    }

    if (typeof cb !== 'function') {

        throw new Error('Route handler must be a function.');
    }

    routes.push({ regexp: regexp, cb: cb });
};

// Programmatically go a page.
// Supports extra arguments.

route.go = function(page) {

    var extra = Array.prototype.slice.call(arguments, 1);

    window.location.hash = '#' + page +
        (extra.length > 0 ? '/' + extra.join('/') : '');
};

// Needed for refresh.

var last;

// Looks for matching routes. Picks first.

function dispatch() {

    var hash = current();

    // Only when hash actually changed from
    // last activation and router is currently
    // enabled.

    if (last === hash || !enabled) {

        return;
    }

    blocked = false;

    if (typeof route.leave === 'function') {

        blocked = !route.leave.call(route);
    }

    if (blocked) {

        // Restore previous hash.

        window.location.hash = '#' + last;

        return;

    } else {

        // Autoremove leave callback.

        route.leave = null;
    }

    last = hash;

    for (var i = 0; i < routes.length; i++) {

        var entry = routes[i];

        var match = hash.match(entry.regexp);

        if (match) {

            entry.cb.apply(null, match.slice(1, match.length));

            break;
        }
    }
}

// Extracts current hash.

function current() {

    var match = location.href.match(/#(.+)$/);

    return match ? match[1] : '';
}

// Refreshes the current location.

route.refresh = function() {

    dispatch();
};

// Flag against multiple enables.

var enabled = false;

// Enables event listeners.

var enable = route.enable = function() {

    if (enabled) {

        return;
    }

    // Sets up hash change and initial callbacks.

    window.addEventListener('load', dispatch, false);
    window.addEventListener('hashchange', dispatch, false);

    enabled = true;
};

// Disables event listeners.

route.disable = function() {

    if (!enabled) {

        return;
    }

    // Removes listeners.

    window.removeEventListener('load', dispatch, false);
    window.removeEventListener('hashchange', dispatch, false);

    enabled = false;
};

// Start with enabled listeners.

enable();
