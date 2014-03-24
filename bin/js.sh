echo 'Browserify/JS Updated'
browserify ./public/browserify/interactions.js -o ./public/bundle.js
sudo node ./generate-markup.js ../api/iorest/api/specs/latest.json  ../api/iorest
