var router = require('express').Router();
var word = require('../controllers/word');
var format = require('./result-formatter');

router.get('/:word', (req, res, next) => {
  word.lookup(req.params.word)
    .then(results => res.send(format(results, req.query.lang)), next);
});

router.get('/:word/related', (req, res, next) => {
  word.related(req.params.word)
    .this(results => res.send(format(results, req.query.lang)), next);
});

router.get('/:word/tags/:tags', (req, res, next) => {
  var promise = word.tags(req.params.word, req.params.tags)
  console.dir(promise)
    promise.then(results => res.send(format(results, req.query.lang)), next);
});

router.get('/:prefix/prefix', (req, res, next) => {
  word.prefix(req.params.prefix)
    .then(results => res.send(format(results, req.query.lang)), next);
});

router.get('/:prefix/suggestions', (req, res, next) => {
  word.suggestions(req.params.prefix, req.query.limit)
    .then(results => res.send(format(results)), next);
});

router.get('/:prefix/fuzzy', (req, res, next) => {
  word.fuzzy(req.params.prefix)
    .then(results => res.send(format(results, req.query.lang)), next);
});

module.exports = router;
