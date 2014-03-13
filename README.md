#IORest

This is a Work in Progress.

Use with caution.

Given a json spec, generates a html file which can be used to test calls to an api.

##Install

```
  npm install -g iorest
```

##Usage

To generate a ioRest file from a spec file just run the ioRest command, the first argument should point to an ioRest spec file, the second argument should point to:

```
  iorest ./specs/sample.json ./out.html
```

##Spec Format
The best way to get an idea how the spec should be formed is to look at the examples in the spec directory.


This is an example JSON document taken as input:


And this is the HTML file generated from the html form:

types in params:

  * checkboxes
  * textarea
  * select

If no input type is specified it will become an input. If location is set to body it will be the only field sent in the body.


Here is a description of the parameters you can set:

  parameter:
```
  {
    name:
    default:
    location: query/body/header
    type: number/string/json //html5 input type - string if none provied.
    input: input/checkbox/select
    required: true/false

  }
```

  ##About

  IORest is inspired by Mashery's IODocs (https://github.com/mashery/iodocs)

  The differences between the two are:


  1.. Decent support for PUTTING/POSTING JSON bodies. The was actually one of the main reason for writing my own, at the time I started writing there was no support for PUT/POST JSON bodies. I found a pull request from two years previous that had not been responded. I poked mashery about this, but by the time they got back to me (only a day later) I had written most of IORest.

  2.. No server, IORest generates a HTML file from your routes, so as long as you have CORS enabled you can post directly to your API from your browser. this can make debugging easier and removes an level of abstraction that was unecessary. For me at least.


  3.. Parameter Validation, IORest uses the same data validation types as html5 so you get html5 validation for free on the front end (assuming your using a reasonably modern browser).  I have also written Restify middlware which can automatically validate against the main data types serverside.

  eg, if you specified a field as required, that request will be rejected in bmiddleware just because its in your route spec.

  4.. eco system - IORest has a number of other plugins that can be used with it to automatically create your routes from folders, auto validate....

  5.. CSS animations

  6.. Loading animation when waiting for data.

  7.. In browser crypto, lets users enter their key and secret and it will work out the hash for them.


  I did look at making the modifications to IODocs but it felt like IODOcs was trying to do more than I needed.

