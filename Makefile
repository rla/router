.DELETE_ON_ERROR:

BROWSERIFY = node_modules/.bin/browserify
HTTP_SERVER = node_modules/.bin/http-server
CASPERJS = node_modules/.bin/casperjs
PHANTOMJS = node_modules/.bin/phantomjs
JSHINT = node_modules/.bin/jshint

BUNDLE = dist/router-standalone.js
MAP = $(BUNDLE).map

$(BUNDLE): router.js Makefile
	$(BROWSERIFY) $< --standalone route -t uglifyify > $@

all: $(BUNDLE)

clean:
	rm -f $(BUNDLE) $(MAP)

serve-test:
	$(HTTP_SERVER) -p 9090 .

test:
	PHANTOMJS_EXECUTABLE=$(PHANTOMJS) $(CASPERJS) test tests/tests.js

check:
	$(JSHINT) router.js

.PHONY: all clean serve-test test check
