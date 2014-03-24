#!/bin/bash

nodemon --watch ./views -e jade ./generate-markup.js ../api/iorest/api/specs/latest.json  ../api/iorest
nodemon --watch ../api/routes -e js --exec 'sh' ./bin/routes.sh
nodemon --watch ./public/less -e less --exec 'sh' ./bin/css.sh
nodemon --watch ./public/browserify -e js --exec 'sh' ./bin/js.sh



