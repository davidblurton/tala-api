# Icelandic declanation API
### [http://api.tala.is](api.tala.is)

An API for icelandic declanations. Uses data from [Beygingarlýsing íslensks nútímamáls](http://bin.arnastofnun.is/DMII/)

`api.tala.is/find/dagur`

```json
{
   "count":1,
   "results":[
      {
         "_id":"dagur~dagur;5752;kk;alm;dagur;NFET",
         "_url":"/id/dagur~dagur;5752;kk;alm;dagur;NFET",
         "headWord":"dagur",
         "binId":"5752",
         "wordClass":"kk",
         "section":"alm",
         "wordForm":"dagur",
         "grammarTag":"NFET"
      }
   ]
}
```

## Declanations api

### `/id/:id`

Finds a word by id

### `/find/:word`

Finds all words that match exactly

### `/related/:word`

Finds all words from the same head word.

### Filters

You can filter results using query parameters. All parameters are optional.

| Parameter | Description | Example |
|-----------|-------------|---------|
| wordClass | Grammatical class (noun, verb, etc) | hk |
| grammarTag| Grammar tag | NF |
| limit     | Maximum number of results to return | 2 |

Example: `api.tala.is/related/tala?wordClass=hk&grammarTag=NF&limit=2`

## Summary api

### `/suggestions/:prefix`

Find words that start with provided prefix. Returns just the suggested word - good for autocomplete.

### `/verb/:verb`

Gives a summary of conjugations for the provided verb.

### `/preposition/:preposition/:word`

Finds declanations of the provided word that match the lexical case of the preposition.

### `/multiple/:word`

Returns true if word matches more than one headword.
