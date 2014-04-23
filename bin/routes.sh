
echo 'Route Updated'
node ../api/bin/generate-spec.js
node ./generate-markup.js ../api/livedocs/specs/latest.json  ../api/livedocs/api
