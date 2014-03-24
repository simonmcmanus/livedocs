
echo 'Route Updated'
node ../api/bin/generate-spec.js
node ./generate-markup.js ../api/iorest/api/specs/latest.json  ../api/iorest
