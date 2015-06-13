var router = require('express').Router();
var word = require('../controllers/word');
var format = require('./result-formatter');

router.get('/:word', (req, res, next) => {
  word.lookup(req.params.word)
    .then(results => res.send(format(results, req.query.lang)))
    .catch(next)
});

router.get('/:word/id', (req, res, next) => {
  word.findById(req.params.word)
    .then(results => res.send(format(results, req.query.lang)))
    .catch(next)
});

router.get('/:word/related', (req, res, next) => {
  word.related(req.params.word)
    .then(results => res.send(format(results, req.query.lang)))
    .catch(next)
});

router.get('/:word/filter', (req, res, next) => {
  word.filter(req.params.word, req.query)
    .then(results => res.send(format(results, req.query.lang)))
    .catch(next)
});

router.get('/:word/multiple', (req, res, next) => {
  word.multiple(req.params.word)
    .then(multiple => res.send(multiple))
    .catch(next)
});

router.get('/:prefix/prefix', (req, res, next) => {
  word.prefix(req.params.prefix)
    .then(results => res.send(format(results, req.query.lang)))
    .catch(next)
});

router.get('/:prefix/suggestions', (req, res, next) => {
  word.suggestions(req.params.prefix, req.query.limit)
    .then(results => res.send(results))
    .catch(next)
});

router.get('/:prefix/fuzzy', (req, res, next) => {
  word.fuzzy(req.params.prefix)
    .then(results => res.send(format(results, req.query.lang)))
    .catch(next)
});

module.exports = router;
