#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');

var jade = require('jade');

var spec = require(path.resolve(process.cwd() , process.argv[2]));



var argv = require('minimist')(process.argv.slice(2));



// allows users to override the docs header.
var topTemplatePath;
if(argv.jade) {
  topTemplatePath = path.join(process.cwd(), argv.jade);
  console.log('top template path is', topTemplatePath)
} else {
  topTemplatePath = path.join(__dirname , '/views/top.jade');
}

var topTemplate = fs.readFileSync( topTemplatePath , { encoding: 'utf8'});


spec.topMarkup = jade.compile(topTemplate, spec)(spec);
spec.css = fs.readFileSync( __dirname + '/public/less/index.css', {
  encoding: 'utf8'
});

spec.js = fs.readFileSync( __dirname  + '/public/bundle.js', {
  encoding: 'utf8'
});

if(argv.js) {
  var customJsPath = path.join(process.cwd(), argv.js);
  console.log('Custom JS path is', customJsPath);
  spec.customjs = fs.readFileSync(customJsPath, {
    encoding: 'utf8'
  });
}


if(argv.css) {
  var customCssPath = path.join(process.cwd(), argv.css);
  console.log('Custom CSS path is', customCssPath)
  spec.customcss = fs.readFileSync(customCssPath, {
    encoding: 'utf8'
  });
}

var templates = {
  index: fs.readFileSync( __dirname + '/views/index.jade' )
};


// bit of a lie but allows jade to work out the relative file paths.
spec.filename = __dirname + '/views/partials/test.jade';
// Compile a function

spec.markdown = require('markdown').markdown.toHTML;
var indexFn = jade.compile(templates.index, spec);

// Render the function
var html = indexFn(spec);


var v = null;
var out;

if(spec.version) {
  v = spec.version.split('.')[0];
  out = path.join(process.cwd(), process.argv[3], '/v' + v + '/index.html');
} else {
  out = path.join(process.cwd(), process.argv[3], '/index.html');
}


fs.writeFile(out, html, function(err) {
  if (!err) {
    console.log('LiveDocs HTML file saved. (' + out + ')');
  }else {
    console.log(err);
  }
});
