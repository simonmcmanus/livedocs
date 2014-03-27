#IORest
Given a json spec, generates a html file which can be used to test calls to an api.

##Install

```
  npm install -g iorest
```

##Usage

To generate a ioRest file from a spec file just run the ioRest command, the
 first argument should point to an ioRest spec file, the second argument should
 point to:

```json
  iorest ./specs/sample.json ./out.html
```

##Authentication

IORest does not support OAuth, it is designed to work with APIs that can serve
content to a standalone webpage.

We use a key and secret to generate a hash and then send the hashed value
along to the server. I'm keen that IORest support other methods of auth but at
the moment you will need to create your own generateHash function in
interactions.js.

If you would like to add an authentication method let me know and I will help
out whereever possible.


##Spec Format
The best way to get an idea how the spec should be formed is to look at the
examples in the spec directory.


This is an example JSON document taken as input:


And this is the HTML file generated from the html form:

##Format Overview:

```json
{
  endpoints : [
    {
      name: 'Assets',
      methods: [
        {
          name: 'Create an Asset',
          synopsis: 'Create a new asset.',
          method: 'GET',
          uri: '/assets',
          parameters: [
            name: 'assetId',
            required: true,
            type: 'string',
            location: 'query',
            default: '1',
            description: 'The id of the asset you wish to create.'
          ]
        }
      ]
    }
  ]
}
```

###Endpoints

An endpoint is a collection of methods with a name property.

Endpoints consist of a name, description and an array of methods.


### Methods

Each method can have the following properties:

```json
{
  name: 'Create an Asset',
  synopsis: 'What the method does',
  uri: '/assets',
  method: 'GET',  // GET/PUT/POST/DELETE
  parameters: [] // see below.

}
```


### Parameters

Each method should the the parameters which can be passed to the method.


For each parameter you have the following fields:

####name

The name of the method.

####required

Will not allow the test form to be submitted without this value. If the
middleware is used the request can also be rejected serverside if the value
is missing.

#### description

The description that will appear in the testing harness.

####type

This is used for validation, possible values are:

  * string
  * json
  * number

####input

This defines the html input that will be used to collect this data. Supported
options include:

  * select
  * textarea
  * checkbox

If no input is specifed IORest will default to an input.

If no input type is specified it will become an input. If location is set to
body it will be the only field sent in the body.

####Options

If you specify select as the input type you should also add an options array to
 the parameter object to state which values are allowed for this list.

```json
{
    "name": "order",
    "location": "query",
    "required": true,
    "default": "ASC",
    "input": "select",
    "type": "string",
    "options": [
        "ASC",
        "DESC"
    ],
    "description": "How to order the fields, ASC or DESC."
}

```

Severside middlware can also be used to ensure values are only accepted which
exist in the options array.


Here is a description of the parameters you can set:

  parameter:
```json
  {
    name:
    default:
    location: query/body/header
    hidden: // do not show this parameter.
    type: number/string/json //html5 input type - text if none provided.
    input: input/checkbox/select - default is input
    required: true/false

  }
```

##About

  IORest is inspired by Mashery's IODocs (https://github.com/mashery/iodocs)

  The differences between the two are:


  1.. Decent support for PUTTING/POSTING JSON bodies. The was actually one of the main reason for writing my own, at the time I started writing there was no support for PUT/POST JSON bodies. I found a pull request from two years previous that had not been responded. I poked mashery about this, but by the time they got back to me (only a day later) I had written most of IORest.

  2.. No server, IORest generates a HTML file from your routes, so as long as you have CORS enabled you can post directly to your API from your browser. this can make debugging easier and removes an level of abstraction that was unecessary. For me at least.

  3.. Standalone file, IORest works as a standalone file, which means you can just send your consumers a HTML file along with any required auth and they can start using testing your API immediately.


  3.. Parameter Validation, IORest uses the same data validation types as html5 so you get html5 validation for free on the front end (assuming your using a reasonably modern browser).  I have also written Restify middlware which can automatically validate against the main data types serverside.

  eg, if you specified a field as required, that request will be rejected in middleware just because its in your route spec.

  4.. eco system - IORest has a number of other plugins that can be used with it to automatically create your routes from folders, auto validate....


  5.. In browser crypto, lets users enter their key and secret and it will work out the hash for them.

  I did look at making the modifications to IODocs but it felt like IODOcs was trying to do more than I needed.



#Issues

Please report any issue here:

https://github.com/simonmcmanus/IORest/issues

This guide is a work in progress, if you spot any mistakes, please create a github issue.


#Contributing

Please submit pull requests.


#Developing

This command will watch all the relevant files and regenerate the html file when changed.
```
  grunt dev
```


#Additional Components:

In the near future I plan to open source the following components which work with IORest:


##IORest Router

Store your routes in a logical folder struture and automatically create the spec file and your application from the folder structure


##Middleware :

validator - check for required values, type checks and ensure enumerated list values are valid.

If you can't find them I probably havnt released them yet. Please feel free to hastle me about releasing them.


