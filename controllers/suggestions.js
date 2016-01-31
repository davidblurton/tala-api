import {generateSuggestions, filterSuggestions} from '../corrections/spelling'

export default {
  suggestions(word) {
    let suggestions = generateSuggestions(word)
    return filterSuggestions(suggestions)
  },
}
