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

Inserting records into our table:

```sql
INSERT INTO test(st) VALUES(('hello', 123, -456.789, true, CURRENT_DATE, CURRENT_TIMESTAMP, array[1,2,3], array['one', 'two']));

INSERT INTO test(st) VALUES(('hello world!', 0, 'NaN', false, null, null, array[1,2,3], array['one\ two', 'four" five']));
```

Selecting all records in the table:

```sql
SELECT * FROM test
```

Result:

```js
(hello,123,-456.789,t,2016-09-17,"2016-09-17 17:53:18.467552+01","{1,2,3}","{one,two}")

("hello world!",0,NaN,f,,,"{1,2,3}","{""one\\\\ two"",""four\\"" five""}")
```

## Composite Tuple


## Tuple Arrays

