
var $ = require('jquery');
var pretty = require('./lib/prettyprint.js');


var prepUrl = exports._prepUrl = function(url, tokens) {
  var queryParams = ['query', 'page', 'size', 'sort', 'order', '$id$'];
  for (var a = 0; queryParams.length > a; a++) {
    console.log('=--> ba', tokens[queryParams[a]]);
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
    url = url.replace(regex, encodeURI(tokens[token]));
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

  $('#changeAuth').click(function() {
    $('body').removeClass('step2').addClass('step1');
  });

  $('form#key').submit(function(e) {
    e.preventDefault();

    $.ajax({
      type: 'GET',
      url: this.action,
      headers: {
         authorization: getHash($(this))
      },
      complete: function (response, status) {
        console.log(response.statusText, status);
        if(response.statusText === 'OK') {
          $('body').removeClass('step1').addClass('step2');
        }else {
          $('body').removeClass('step2').addClass('step1');
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
  function updateResults($form, url, headers, status, body) {
    $form.find('.uri').html(url);
    $form.find('.headers').html(pretty.prettyPrint(headers || {}));
    $form.find('.status').html(status);
    $form.find('pre.pretty').html(pretty.prettyPrint(body || {}));
    $form.find('pre.raw').html(JSON.stringify(body));
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

    var url = tokenise(action, values);

    var headers = {
       authorization: getHash($('form#key'))
    };
    var options = {
      type: $form.attr('method'),
      url: url,
      headers: headers,
      complete: function (response, status) {
        updateResults($form, this.url, headers, response.status, response.responseJSON);
        $submit.removeClass('loading');
        $form.find('.results').addClass('show');
        $form.find('.clear').removeAttr('disabled');
      }
    };
    if(values.body) {
      console.log('sending body');
      options.dataType = 'json';
      options.data = JSON.parse(values.body);
    } else {
      options.data = $form.serialize();
    }
    $.ajax(options);
  });

  function getHash($form) {
    var key = $form.find('#key').val();
    var secret = $form.find('#secret').val();
    var crypto = require('crypto');
    var hash = crypto.createHmac('sha256', secret).update(key).digest('hex');
    return key + ':' + hash;
  }

  // remember the key and secret values.
  $('input#key').val(localStorage.getItem('adBank-key'));
  $('input#secret').val(localStorage.getItem('adBank-secret'));
  $('input#key, input#secret').keydown(function() {
    localStorage.setItem('adBank-' + this.id, $(this).val());
  });


  $('.clear').click(function() {
    this.disabled = true;
    $(this).parents('form').find('pre.uri, pre.status, pre.headers, pre.pretty, pre.raw').empty();
  })

});
