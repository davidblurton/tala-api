const Nodehun = require('nodehun')
const fs = require('fs')
const path = require('path')

const affbuf = fs.readFileSync(path.join(__dirname, 'is.aff'))
const dictbuf = fs.readFileSync(path.join(__dirname, 'is.dic'))

const dict = new Nodehun(affbuf, dictbuf)

export function getSuggestions(word, cb) {
  dict.spellSuggestions(word, function(err, correct, suggestion, origWord) {
    cb(err, suggestion)
  })
}
