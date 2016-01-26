export default function(row) {
  let word = row.split('~')[1]
  let [headWord, binId, wordClass, section, form, grammarTag] = word.split(';')

  return {
    headWord,
    binId: parseInt(binId, 10),
    wordClass,
    section,
    form,
    grammarTag,
  }
}
