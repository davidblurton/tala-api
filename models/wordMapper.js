export default function(data) {
  let word = data.split('~')[1]
  let row = word.split(';')

  return {
    _id: word,
    _url: `/id/${data}`,
    headWord: row[0],
    binId: row[1],
    wordClass: row[2],
    section: row[3],
    wordForm: row[4],
    grammarTag: row[5]
  }
}
