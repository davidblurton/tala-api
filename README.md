# Icelandic

## Schema

Example record:

```
abbadís;117998;kvk;alm;abbadísunum;ÞGFFTgr
```

Data is stored in the key, nothing is stored in the value. Key is prefixed by fields we want to index on and a ~. The example record would be stored in the following 2 entries.

```
abbadísunum~abbadís;117998;kvk;alm;abbadísunum;ÞGFFTgr
117998~abbadís;117998;kvk;alm;abbadísunum;ÞGFFTgr
```

Supported values: `en` `is`

## /:word

Looks up an exact match

## /:word/related

Finds all words with the same head word.

## /:word/filter

Looks up related words with provided filters.

### Parameters

wordClass (optional)
grammarTag (optional) Full tag or comma separated tags.

`/api/dagur/filter?wordClass=kk&grammarTag=ET`

## /:prefix/prefix

Find words that start with provided prefix. Returns full entries.

## /:prefix/suggestions

Find words that start with provided prefix. Returns just the suggested word - good for autocomplete.

### Parameters

limit (optional, default 10) How many results to return.



