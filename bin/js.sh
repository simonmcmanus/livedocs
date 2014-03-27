echo 'Browserify/JS Updated'
browserify ./public/browserify/interactions.js -o ./public/bundle.js
node ./generate-markup.js ../api/iorest/specs/latest.json  ../api/iorest/api
