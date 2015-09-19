import assert from 'assert'
import declensions from '../controllers/declensions'
import _ from 'lodash'
import lookup from '../translate/translate.json'

const sentence = '„Þegar fólk er dregið á asna­eyr­un­um, þá fýk­ur í fólk. Það voru all­ir til­bún­ir að sýna þessu skiln­ing í gær­kvöldi. En þegar það bæt­ist við svona klukku­tími eft­ir klukku­tíma, þá fýk­ur í fólk,“ seg­ir Berg­ur Þorri Benja­míns­son, en ferð hans og konu hans heim til Íslands, sem átti að taka 5 tíma tók 26.'
const language = 'en'

describe('Sentences', () => {

  it.skip('should parse a sentence', async function() {

    let split = sentence.replace(/[.,-\/#!$%\^&\*;:{}=\-_~()­]/g,'').split(' ')

    let results = await* split.map(declensions.find)

    let zipped = _.zipObject(split, results.map(x => _.unique(x.map(y => y.wordClass))))

    let translated = _.mapValues(zipped, tags => tags.map(tag => lookup[language].wordClass[tag] || tag))
  })
})
