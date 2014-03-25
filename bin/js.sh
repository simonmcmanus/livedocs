echo 'Browserify/JS Updated - 0'
browserify ./public/browserify/interactions.js -o ./public/bundle.js
echo 'Browserify/JS Updated - 1'
sudo node ./generate-markup.js ../api/iorest/specs/latest.json  ../api/iorest
echo 'Browserify/JS Updated - 2'
