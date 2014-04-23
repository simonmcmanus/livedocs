echo 'Browserify/JS Updated'
browserify ./public/browserify/interactions.js -o ./public/bundle.js
node ./generate-markup.js ../api/livedocs/specs/latest.json  ../api/livedocs/api
