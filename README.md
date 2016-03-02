# Icelandic declension API
### [api.tala.is](http://api.tala.is)

An API for icelandic declensions. Uses data from [Beygingarlýsing íslensks nútímamáls](http://bin.arnastofnun.is/DMII/)

`api.tala.is/find/hestur?lang=en`

```js
[
   {
      headWord: "Hestur",
      binId: 259304,
      wordClass: "Noun (masculine)",
      section: "örn",
      forms: [
         {
            form: "Hestur",
            grammarTag: "NFET",
            tags: {
               grammarCase: "nominative",
               number: "singular",
               article: "indefinite",
               gender: "masculine"
            }
         },
         {
            form: "Hest",
            grammarTag: "ÞFET",
            tags: {
               grammarCase: "accusative",
               number: "singular",
               article: "indefinite",
               gender: "masculine"
         }
         ...
   }
]
```

## Declensions api

Search is case-insensitive (hestur returns results for hestur and Hestur). Add a `lang` query parameter to translate tags (supported languages: `en`, `is`)

### `/id/:id`

Finds a word by bin id

### `/find/:word`

Finds all words that match exactly
