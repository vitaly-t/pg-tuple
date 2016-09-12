pg-tuple
========

**This project is under development.**

[![Build Status](https://travis-ci.org/vitaly-t/pg-tuple.svg?branch=master)](https://travis-ci.org/vitaly-t/pg-tuple)
[![Coverage Status](https://coveralls.io/repos/github/vitaly-t/pg-tuple/badge.svg?branch=master)](https://coveralls.io/github/vitaly-t/pg-tuple?branch=master)
[![Join the chat at https://gitter.im/vitaly-t/pg-tuple](https://badges.gitter.im/vitaly-t/pg-tuple.svg)](https://gitter.im/vitaly-t/pg-tuple?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Parses PostgreSQL tuples, with support for:

* composite tuples
* arrays of tuples

## Installing

```
$ npm install pg-tuple --save
```

## Usage

```js
var tuple = require(pg-tuple);
```

Suppose you have a custom type in your database, declared like this:

```sql
CREATE TYPE myType AS (a INT, b TEXT);
```

Column values of such type are presented as tuple strings that require parsing.

* parsing into an array of values - strings

```js
var data = tuple.single(value);
// data = an array of strings like this: ['1', 'text'] 
```

* parsing into the original object structure of `{a, b}`

```js
var obj = tuple.single(value, function(data, res) {
    // `this` here refers to `res`
    res.a = parseInt(data[0]);
    res.b = data[1];
});
// obj = a well-parsed object like this: {a:1, b:'text'}
```

For columns declared as an array of your custom type (`myType[]`):   

```js
var data = tuple.array(value);
// data = an array of tuple strings
```

Parsing `myType[]` tuple string into an array of objects (composite parsing):

```js
var data = tuple.array(value, function(v, index) {
    return tuple.single(v, function(data, res) {
        res.a = parseInt(data[0]);
        res.b = data[1];
    });
});
// data = an array of well-parsed objects: [{a:1, b:'hello'},{a:2, b:'world'}]
```

## Testing

First, clone the repository and install DEV dependencies.

```
$ npm test
```

Testing with coverage:
```
$ npm run coverage
```

## License

Copyright © 2016 [Vitaly Tomilov](https://github.com/vitaly-t);
Released under the MIT license.

