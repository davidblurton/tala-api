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
      output: 'plain',
      errors: true,
      functions: true,
      agreement: true,
      mergelabels: false,
      markunknown: true,
      inputtokenize: 2,
      tagging: true,
      tagger: 'hmmicehmm'
    }
  })

  let lines = res.data.match(/[^\r\n]+/g)

  let tokenized = lines[0].trim()
  let parsed = lines[lines.length - 1].trim()
  let tagged = lines.slice(1, -1).filter(x => x)

  return {tokenized, tagged, parsed}
}

export default lookup
