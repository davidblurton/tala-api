import * as fs from 'fs'
import Promise from 'prfun'

const readFile = Promise.promisify(fs.readFile)

async function parseStatic() {
  const data = await readFile('data/verbs.conf', 'utf8')
  const results = {}

  for (let line of data.split(/[\r\n]+/)) {
    line = line.replace(/\s*(#.*)?$/, '')
    const [verb, ...cases] = line.split(/\s+/)

    if (!results[verb]) {
      results[verb] = []
    }

    if (cases.length) {
      // Verb controls cases
      results[verb].push(... cases.map(c => c.toUpperCase()))
    }
  }

  return results
}

const DATA_PROMISE = parseStatic()

async function lookup(verb) {
  const data = await DATA_PROMISE
  return data[verb]
}

export default lookup
