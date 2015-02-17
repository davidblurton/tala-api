var router = require('express').Router();
var word = require('../controllers/word');
var format = require('./result-formatter');

router.get('/:word', function(req, res, next) {
  word.lookup(req.params.word, function(results) {
    res.send(format(results, req.query.lang));
  }, next);
});

router.get('/:word/related', function(req, res, next) {
  word.related(req.params.word, function(results) {
    res.send(format(results, req.query.lang));
  }, next);
});

router.get('/:word/tags/:tags', function(req, res, next) {
  word.tags(req.params.word, req.params.tags, function(results) {
    res.send(format(results, req.query.lang));
  }, next);
});

router.get('/:prefix/prefix', function(req, res, next) {
  word.prefix(req.params.prefix, function(results) {
    res.send(format(results, req.query.lang));
  });
});

router.get('/:prefix/suggestions', function(req, res, next) {
  word.suggestions(req.params.prefix, req.query.limit, function(results) {
    res.send(format(results));
  });
});

router.get('/:prefix/fuzzy', function(req, res, next) {
  word.fuzzy(req.params.prefix, function(results) {
    res.send(format(results, req.query.lang));
  });
});

module.exports = router;
