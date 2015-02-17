var map = {
  a: 'á',
  e: 'é',
  i: 'í',
  o: 'ó',
  u: 'ú',
  y: 'ý',
  //th: 'þ',
  //ae: 'æ',
  d: 'ð'
};

String.prototype.replaceAt = function(index, character) {
  return this.substr(0, index) + character + this.substr(index + character.length);
};

function cartProd(paramArray) {
  function addTo(curr, args) {
    var i, copy,
      rest = args.slice(1),
      last = !rest.length,
      result = [];

    for (i = 0; i < args[0].length; i++) {
      copy = curr.slice();
      copy.push(args[0][i]);

      if (last) {
        result.push(copy);
      } else {
        result = result.concat(addTo(copy, rest));
      }
    }
    return result;
  }

  return addTo([], Array.prototype.slice.call(arguments));
}

var fuzzy = function(word) {
  var replacementIndexes = [];

  word.split('').map(function(letter, i) {
    if (map[letter]) {
      replacementIndexes.push(i);
    }
  });

  if(!replacementIndexes.length) {
    return [word];
  }

  var banana = replacementIndexes.map(function(i) {
    return [
      [i, true],
      [i, false]
    ];
 });

  var replacementMap = cartProd.apply(null, banana);

  return replacementMap.map(function(replacer) {
    return replacer.reduce(function(word, inst) {
      var replacementIndex = inst[0];
      var shouldReplace = inst[1];

      return shouldReplace ? word.replaceAt(replacementIndex, map[word[replacementIndex]]) : word;
    }, word);
  });
};

export default {
  getSuggestions: fuzzy
};
