pg-tuple
========

[![Build Status](https://travis-ci.org/vitaly-t/pg-tuple.svg?branch=master)](https://travis-ci.org/vitaly-t/pg-tuple)
[![Coverage Status](https://coveralls.io/repos/vitaly-t/pg-tuple/badge.svg?branch=master)](https://coveralls.io/r/vitaly-t/pg-tuple?branch=master)

Parses a text string that represents a PostgreSQL tuple into an array of strings.

## Installing

```
$ npm install pg-tuple
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

## Usage

```js
var tuple = require('pg-tuple');

var data = "(1,text)";

tuple(data); //=> ['1','text']
```

## License

Copyright © 2016 [Vitaly Tomilov](https://github.com/vitaly-t);
Released under the MIT license.

