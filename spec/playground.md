# Tuple Playground Tests

Here we do a few tests to see how different tuple values are returned by PostgreSQL.

## Content

* [Simple Tuple](#simple-tuple)
* [Composite Tuple](#composite-tuple)
* [Tuple Arrays](#tuple-arrays)

## Simple Tuple

Creating a custom type with most of the interesting data types:

```sql
CREATE TYPE simpleType AS (
    msg text,
    num int,
    dec float,
    flag boolean,
    d date,
    dt timestamptz,
    nums int[],
    doc text[]
 );
```

Creating a table that uses our custom type:

```sql
CREATE TABLE test(
   st simpleType
);
```

Inserting 3 rows into our table:

```sql
INSERT INTO test(st) VALUES
(('hello', 123, -456.789, true, CURRENT_DATE, CURRENT_TIMESTAMP, array[1,2,3], array['one', 'two', 'three'])),
(('hello world!', 0, 'NaN', false, null, null, array[1,2,3], array['one\ two', 'three" four'])),
((E'\\ text', 0, 'NaN', false, null, null, array[]::int[], array['one { two', 'three } four']));
```

Selecting all records in the table:

```sql
SELECT * FROM test
```

Result:

```js
(hello,123,-456.789,t,2016-09-17,"2016-09-17 18:22:08.515852+01","{1,2,3}","{one,two,three}")

("hello world!",0,NaN,f,,,"{1,2,3}","{""one\\\\ two"",""three\\"" four""}")

("\\ text",0,NaN,f,,,{},"{""one { two"",""three } four""}")
```

Thoughts: the way the format mutates as the data changes is horrifying:

* why array is normally presented inside double-quotes, while an empty array is suddenly an open value?
* why a single `"` is suddenly presented as `\\""`?
* why unicode-formatted text is changing the escaping for `\`? How can we tell the difference then?
* the way that `{` and `}` are escaped is not always clear 

## Composite Tuple


## Tuple Arrays

