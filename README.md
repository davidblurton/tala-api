# api.tala.is

An API for icelandic declanations. Uses data from [Beygingarlýsing íslensks nútímamáls](http://bin.arnastofnun.is/DMII/)

## /:word

Finds all words that match exactly

## /:word/id

Finds a word by id

## /:word/related

Finds all words with the same head word.

## /:word/filter

Looks up related words with provided filters.

`/api/dagur/filter?wordClass=kk&grammarTag=ET`

### Parameters

wordClass (optional)

grammarTag (optional) Full tag or comma separated parts.

### Parameters

limit (optional, default unlimited) How many results to return.

# Summary api

## /:prefix/suggestions

Find words that start with provided prefix. Returns just the suggested word - good for autocomplete.

### Parameters

limit (optional, default unlimited) How many results to return.

## /verb/:verb

Gives a summary of conjugations for the provided verb.

## /preposition/:preposition/:word

Finds declanations of the provided word that match the lexical case of the preposition.

## /:word/multiple

Returns true if word matches more than one headword.




