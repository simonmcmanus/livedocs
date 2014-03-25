#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');

var spec = require(path.resolve(process.cwd() , process.argv[2]));
spec.css = fs.readFileSync( __dirname + '/public/less/index.css', {
  encoding: 'utf8'
});

spec.js = fs.readFileSync( __dirname  + '/public/bundle.js', {
  encoding: 'utf8'
});

var templates = {
  index: fs.readFileSync( __dirname + '/views/index.jade' )
}

var jade = require('jade');

// bit of a lie but allows jade to work out the relative file paths.
spec.filename = __dirname + '/views/partials/test.jade';
// Compile a function


var IndexFn = jade.compile(templates.index, spec);

// Render the function
var html = IndexFn(spec);

var v = spec.version.split('.')[0];


var out = path.join(process.cwd(), process.argv[3], '/v' + v + '.html');

fs.writeFile(out, html, function(err) {
  if (!err) {
    console.log('IORest HTML file saved. (' + out + ')');
  }else {
    console.log(err);
  }
});
