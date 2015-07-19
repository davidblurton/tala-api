# api.tala.is

An API for icelandic declanations. Uses data from [Beygingarlýsing íslensks nútímamáls](http://bin.arnastofnun.is/DMII/)

`api/tala.is/find/dagur`

```
{
   "count":1,
   "results":[
      {
         "_id":"dagur~dagur;5752;kk;alm;dagur;NFET",
         "_url":"/id/dagur~dagur;5752;kk;alm;dagur;NFET",
         "headWord":"dagur",
         "bilId":"5752",
         "wordClass":"kk",
         "section":"alm",
         "wordForm":"dagur",
         "grammarTag":"NFET"
      }
   ]
}
```

## Parameters

wordClass (optional)

grammarTag (optional) Full tag.

grammarTags (optional) Comma separated parts.

limit (optional, default unlimited) How many results to return.

## /id/:id

Finds a word by id

## /find/:word

Finds all words that match exactly

## /related/:word

Finds all words with the same head word.

# Summary api

## /suggestions/:prefix

Find words that start with provided prefix. Returns just the suggested word - good for autocomplete.

### Parameters

limit (optional, default unlimited) How many results to return.

## /verb/:verb

Gives a summary of conjugations for the provided verb.

## /preposition/:preposition/:word

Finds declanations of the provided word that match the lexical case of the preposition.

## /multiple/:word

Returns true if word matches more than one headword.




