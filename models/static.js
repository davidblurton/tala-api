import * as fs from 'fs'
import Promise from 'prfun'

const readFile = Promise.promisify(fs.readFile)

async function parseStatic() {
  const data = await readFile('data/verbs.conf', 'utf8')
  const results = {}

  for (let line of data.split(/[\r\n]+/)) {
    line = line.replace(/\s*(#.*)?$/, '')
    const [verb, ...cases] = line.split(/\s+/)

    // Only support simple verb>noun sentances for now.
    if (cases.length !== 1) {
      continue;
    }

    if (!results[verb]) {
      results[verb] = []
    }
    // Verb controls cases
    results[verb].push(cases[0].toUpperCase())
  }

  return results
}

const DATA_PROMISE = parseStatic()

async function lookup(verb) {
  const data = await DATA_PROMISE
  return data[verb]
}

export default lookup
