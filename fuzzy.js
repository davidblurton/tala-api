let map = {
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
    let i;
    let copy;
    let rest = args.slice(1);
    let last = !rest.length;
    let result = [];

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

let fuzzy = function(word) {
  let replacementIndexes = [];

  word.split('').map(function(letter, i) {
    if (map[letter]) {
      replacementIndexes.push(i);
    }
  });

  if (!replacementIndexes.length) {
    return [word];
  }

  let banana = replacementIndexes.map(function(i) {
    return [
      [i, true],
      [i, false]
    ];
  });

  let replacementMap = cartProd.apply(null, banana);

  return replacementMap.map(function(replacer) {
    return replacer.reduce(function(word, inst) {
      let replacementIndex = inst[0];
      let shouldReplace = inst[1];

      return shouldReplace ? word.replaceAt(replacementIndex, map[word[replacementIndex]]) : word;
    }, word);
  });
};

export default {
  getSuggestions: fuzzy
};
