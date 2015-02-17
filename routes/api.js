var router = require('express').Router();
var controller = require('../controllers/word');
var resultFormatter = require('./result-formatter');

router.get('/:word', function(req, res, next) {
  controller.lookup(req.params.word, function(results) {
    res.send(resultFormatter(results, req.query.lang));
  }, next);
});

router.get('/:word/related', function(req, res, next) {
  controller.related(req.params.word, function(results) {
    res.send(resultFormatter(results, req.query.lang));
  }, next);
});

router.get('/:word/tags/:tags', function(req, res, next) {
  controller.tags(req.params.word, req.params.tags, function(results) {
    res.send(resultFormatter(results, req.query.lang));
  }, next);
});

router.get('/:prefix/prefix', function(req, res, next) {
  controller.prefix(req.params.prefix, function(results) {
    res.send(resultFormatter(results, req.query.lang));
  });
});

router.get('/:prefix/suggestions', function(req, res, next) {
  controller.suggestions(req.params.prefix, req.query.limit, function(results) {
    res.send(resultFormatter(results));
  });
});

router.get('/:prefix/fuzzy', function(req, res, next) {
  controller.fuzzy(req.params.prefix, function(results) {
    res.send(resultFormatter(results, req.query.lang));
  });
});

module.exports = router;
