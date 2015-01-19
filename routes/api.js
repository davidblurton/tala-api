var express = require('express');
var router = express.Router();

var controller = require('../controllers/word');
var translate = require('../translate');

function format(results, lang) {
  return {
    count: results.length,
    results: results.map(function(result) {
      return translate(result, lang)
    })
  }
}

router.get('/:word', function(req, res, next) {
  var lang = req.query.lang;

  controller.lookup(req.params.word, function(results) {
    res.send(format(results, lang));
  }, next);
});

router.get('/:word/related', function(req, res, next) {
  var lang = req.query.lang;

  controller.related(req.params.word, function(results) {
    res.send(format(results, lang));
  }, next);
});

router.get('/:prefix/prefix', function(req, res, next) {
  var lang = req.query.lang;

  controller.prefix(req.params.prefix, function(results) {
    res.send(format(results, lang));
  });
});

router.get('/:prefix/suggestions', function(req, res, next) {
  controller.suggestions(req.params.prefix, function(results) {
    res.send(format(results));
  });
});

module.exports = router;
