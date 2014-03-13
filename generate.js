#!/usr/bin/env node
'use strict';

var fs = require('fs');
var spec = require(process.argv[2] || './specs/sample.json');


spec.css = fs.readFileSync('./public/style.css', {
  encoding: 'utf8'
});

spec.js = fs.readFileSync('./public/bundle.js', {
  encoding: 'utf8'
});

var templates = {
  index: fs.readFileSync('./views/index.jade'),
}

var jade = require('jade');

// bit of a lie but allows jade to work out the relative file paths.
spec.filename = __dirname + '/views/partials/test.jade';
// Compile a function
var IndexFn = jade.compile(templates.index, spec);

// Render the function
var html = IndexFn(spec);
var out = process.argv[3] || './out.html';
fs.writeFile(out, html, function(err) {
  if (!err) {
    console.log('IORest file saved. (' + out + ')');
  }else {
    console.log(error);
  }
});
