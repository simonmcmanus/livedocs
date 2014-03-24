#Jade -> HTML
nodemon --watch ./views -e jade ./generate-markup.js ../api/iorest/api/specs/latest.json  ../api/iorest

#LESS -> CSS -> HTML
nodemon --watch ./public/less -e less --exec 'sh' ./bin/css.sh

#Browserify ->  JS -> HTML
nodemon --watch ./public/browserify -e js --exec 'sh' ./bin/js.sh

