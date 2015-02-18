# Icelandic

## Schema

Example record:

```
abbadís;117998;kvk;alm;abbadísunum;ÞGFFTgr
```

Data is stored in the key, nothing is stored in the value§. Key is prefixed by fields we want to index on and a ~. The example record would be stored in the following 2 entries.

```
abbadísunum~abbadís;117998;kvk;alm;abbadísunum;ÞGFFTgr
117998~abbadís;117998;kvk;alm;abbadísunum;ÞGFFTgr
```
