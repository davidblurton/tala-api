import axios from 'axios'

let lookup = async function(query) {
  let res = await axios({
    url: 'http://nlp.cs.ru.is/IceNLPWebService/',
    method: 'get',
    params: {
      mode: 'icenlp',
      parsing: true,
      tokenize: true,
      query: query,
      lemma: true,
      output: 'json',
      errors: true,
      functions: true,
      agreement: true,
      mergelabels: false,
      markunknown: true,
      inputtokenize: 2,
      tagging: true,
      tagger: 'hmmicehmm',
    },
  })

  let lines = res.data.split(/^\s*$[\n\r]{1,}/gm)

  let tokenized = lines[0].trim().split(' ')
  let tagged = lines[1].trim().split(/\n/)
  let parsed = lines[2].trim()

  return {tokenized, tagged, parsed}
}

export default lookup
