'use strict';

var $ = require('jquery');
var pretty = require('../lib/prettyprint.js');
var generateHash = require('../../../api/lib/generateHash');



function getQueryHash($form) {
  return generateHash.getQueryHash($form.find('#key').val(), $form.find('#secret').val());
}

function getHeaderHash($form) {
  return generateHash.getHeaderHash($form.find('#key').val(), $form.find('#secret').val());
}


var prepUrl = function(url, tokens) {
  // these params will alwas be allowed in the url even if the url template does not list these params.
  var queryParams = ['query', 'page', 'size', 'sort', 'order', '$id$',
        'detail', 'assetDetail', 'images', 'revisions', 'rights', 'authorization'];
  for (var a = 0; queryParams.length > a; a++) {
    if (tokens && tokens[queryParams[a]]) {
      var seperator  = (url.indexOf('?') === -1) ? '?' : '&';
      url = url + seperator + encodeURIComponent(queryParams[a]) +
        '=:' + encodeURIComponent(queryParams[a]);
    }
  }
  return url;
};

 var tokenise = function(url, tokens) {
  for (var token in tokens) {
    var regex = new RegExp(':' + encodeURIComponent(token), 'g');
    url = url.replace(regex, encodeURIComponent(tokens[token]));
    // todo - remove the item from the form so it ooesnt get sent twie
  }
  return url;
};

$(function() {
  $('ul.json li a').click(function(e) {
    e.preventDefault();
    var $parent = $(this).parents('div.output');
    $parent.toggleClass('raw', !$parent.hasClass('raw'));
    $parent.toggleClass('pretty', !$parent.hasClass('pretty'));
  })

  // $('#changeAuth').click(function() {
  //   $('body').removeClass('step2').addClass('step1');
  // });
  $('form#key').submit(function(e) {
    e.preventDefault();

    $.ajax({
      type: 'GET',
      url: this.action,
      headers: {
         authorization: getHeaderHash($(this))
      },
      complete: function (response, status) {
        if(response.statusText === 'OK') {
            alert('Key and Secret are valid.');
 //         $('body').removeClass('step1').addClass('step2');
        }else {
//          $('body').removeClass('step2').addClass('step1');
          alert('Please enter a valid key and secret to proceed.');
        }
      }
    })
  });


  $('div.header').click(function() {
    var $form = $(this).next();
    if($form.hasClass('hidden')) {
      $form.removeClass('hidden');
      if($form.find('.results').hasClass('show')) {
        $form.addClass('withResults');
      }
    } else {
      $form.addClass('hidden');
      $form.removeClass('withResults');
    }
  })
  function updateResults($form, url, headers, status, body, html) {
    $form.find('.uri').html(url);
    $form.find('.headers').html(pretty.prettyPrint(headers || {}));
    $form.find('.status').html(status);
    if(body) {
      $form.find('pre.pretty').html(pretty.prettyPrint(body || {}));
      $form.find('pre.raw').html(JSON.stringify(body));
    }else if(html) {
      $form.find('pre.pretty').html(html);
      $form.find('pre.raw').html(html);

    }
  };

  $('form').submit(function(e) {
    e.preventDefault();
    var $form = $(this);
    var $submit = $form.find('input[type="submit"]');
    $submit.addClass('loading');
    var action = $form.attr('data-action-template');
    var values = $form.serializeArray().reduce(
      function(obj, item) {
        obj[item.name] = item.value;
        return obj
      }, {}
    );
    $form.addClass('withResults');
    var method = $form.attr('method');


    var headers = {};

    if($form.attr('data-auth-method') === 'query') {
      values.authorization = getQueryHash($('form#key'));
    } else {
      headers.authorization = getHeaderHash($('form#key'));
    }

    if(method === 'GET') { // why only get? comments pls.
      action = prepUrl(action, values);
    }

    var url = tokenise(action, values);


    var options = {
      type: method,
      url: url,
      processData : false,
      headers: headers,
      complete: function (response, status) {
        if($form.attr('data-output') === 'image') {
          updateResults($form, this.url, headers, response.status || response.statusText, null, '<img src="' + url + '" />');
        }else {
          updateResults($form, this.url, headers, response.status || response.statusText, response.responseJSON);
        }
        $submit.removeClass('loading');
        $form.find('.results').addClass('show');
        $form.find('.clear').removeAttr('disabled');
      }
    };
    if(values.body) {
      options.dataType = 'json';

      options.data = values.body;
      options.contentType = 'application/json';
    } else {
      if(method !== 'GET') {
        options.data = $form.serialize();
      }
    }
    options.timeout = 10000;
    $.ajax(options);
  });



  // remember the key and secret values.
  $('input#key').val(localStorage.getItem('livedocs-key'));
  $('input#secret').val(localStorage.getItem('livedocs-secret'));
  $('input#key, input#secret').keyup(function() {
    localStorage.setItem('livedocs-' + this.id, $(this).val());
  });

  $('.clear').click(function() {
    this.disabled = true;
    $(this).parents('form').find('pre.uri, pre.status, pre.headers, pre.pretty, pre.raw').empty();
  })

});
