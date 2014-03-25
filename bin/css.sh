
echo 'LESS/CSS Updated'
lessc ./public/less/index.less > ./public/less/index.css
node ./generate-markup.js ../api/iorest/specs/latest.json  ../api/iorest
