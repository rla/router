// Collect all "pages" into an object.

var pages = {};
var nodes = document.querySelectorAll('div[id^="page-"]');

for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var name = /page-(.*)/.exec(node.id)[1];
    pages[name] = node;
}

// Shows the given "page".

function show(name) {
    for (var p in pages) {
        if (pages.hasOwnProperty(p)) {
            pages[p].classList.add('hide');
        }
    }
    pages[name].classList.remove('hide');
}

route(/^home/, function() {
    show('home');
});

route(/^about/, function() {
    show('about');
});

var profile = 0;

route(/^profile\/(-?[0-9]+)/, function(id) {
    document.getElementById('profile-id').textContent = id;
    profile = parseInt(id, 10);
    show('profile');
});

// Go to the next profile.

route(/^profile\/next/, function() {
    route.go('profile', ++profile);
});

// Go to the previous profile.

route(/^profile\/prev/, function() {
    route.go('profile', --profile);
});

// Default: send to home.

route(/.*/, function() {
    route.go('home');
}); 
