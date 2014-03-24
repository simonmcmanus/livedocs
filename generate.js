#!/usr/bin/env node
'use strict';

var fs = require('fs');

var spec = require(process.cwd() + '/api/iorest/api/specs/latest.json');

spec.css = fs.readFileSync(process.cwd()  + '/restio/public/style.css', {
  encoding: 'utf8'
});

spec.js = fs.readFileSync(process.cwd()  + '/restio/public/bundle.js', {
  encoding: 'utf8'
});

var templates = {
  index: fs.readFileSync(process.cwd()  + '/restio/views/index.jade')
}

var jade = require('jade');

// bit of a lie but allows jade to work out the relative file paths.
spec.filename = __dirname + '/views/partials/test.jade';
// Compile a function


var IndexFn = jade.compile(templates.index, spec);

// Render the function
var html = IndexFn(spec);

var v = spec.version.split('.')[0];


var out = process.cwd() + '/api/iorest/v' + v + '.html';


fs.writeFile(out, html, function(err) {
  var out = process.cwd() + '/api/iorest/v' + v + '.html';
  if (!err) {
    console.log('IORest HTML file saved. (' + out + ')');
  }else {
    console.log(err);
  }
});


var out = process.cwd() + '/api/iorest/index.html';

// get version number from file.
fs.writeFile(out, html, function(err) {
  if (!err) {
    console.log('IORest HTML file saved. (/iorest/latest.html)');
  }else {
    console.log(err);
  }
});
