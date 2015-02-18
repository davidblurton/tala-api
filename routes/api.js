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

router.get('/:word/tags', (req, res, next) => {
  word.tags(req.params.word)
    .then(results => res.send(format(results, req.query.lang)))
    .catch(next)
});

router.get('/:word/tag/:tags', (req, res, next) => {
  word.tag(req.params.word, req.params.tags)
    .then(results => res.send(format(results, req.query.lang)))
    .catch(next)
});


router.get('/:word/classes', (req, res, next) => {
  word.classes(req.params.word)
    .then(results => res.send(format(results, req.query.lang)))
    .catch(next)
})

router.get('/:word/class/:class', (req, res, next) => {
  word.class(req.params.word, req.params.class)
    .then(results => res.send(format(results, req.query.lang)))
    .catch(next)
})

router.get('/:prefix/prefix', (req, res, next) => {
  word.prefix(req.params.prefix)
    .then(results => res.send(format(results, req.query.lang)))
    .catch(next)
});

router.get('/:prefix/suggestions', (req, res, next) => {
  word.suggestions(req.params.prefix, req.query.limit)
    .then(results => res.send(format(results)))
    .catch(next)
});

router.get('/:prefix/fuzzy', (req, res, next) => {
  word.fuzzy(req.params.prefix)
    .then(results => res.send(format(results, req.query.lang)))
    .catch(next)
});

module.exports = router;
