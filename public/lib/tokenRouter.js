/**
 * Tokenise a url.
 * @param  {String} url    The url to be tokenised, eg:
 *                                         '/asset/:id?query=:query'
 * @param  {Object} tokens The token to be placed into the url, tokens.token
 *                                         does not need to be passed in.
 * @return {String}        The tokenised url.
 */
exports.tokenise = function(url, tokens) {
  url = prepUrl(url, tokens);

  for (var token in tokens) {
    var regex = new RegExp(':' + encodeURIComponent(token), 'g');
    url = url.replace(regex, encodeURI(tokens[token]));
  }
  return url;
};
