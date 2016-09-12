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
var tuple = require('pg-tuple');
```

Suppose you have a custom type in your database, declared like this:

```sql
CREATE TYPE myType AS (a INT, b TEXT);
```

Column values of such type are retrieved as tuple strings that require parsing.

* parsing into an array of string values:

```js
var data = tuple.single(value);
// data = an array of strings like this: ['1', 'text'] 
```

* parsing into a proper object `{a, b}`:

```js
var data = tuple.single(value, function(e, obj) {
    // `this` here refers to `obj`
    obj.a = parseInt(e[0]);
    obj.b = e[1];
});
// data = a well-parsed object like this: {a:1, b:'text'}
```

* For columns of array type `myType[]`:   

```js
var data = tuple.array(value);
// data = an array of tuple strings
```

* Convert `myType[]` into an array of objects (composite parsing):

```js
var data = tuple.array(value, function(v, index) {
    return tuple.single(v, function(e, obj) {
        obj.a = parseInt(e[0]);
        obj.b = e[1];
    });
});
// data = an array of objects: [{a:1, b:'hello'},{a:2, b:'world'}]
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

