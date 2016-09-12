'use strict';

var lib = require('../lib');

describe('Library', function () {
    it('must expose all known functions', function () {
        expect(typeof lib.single).toBe('function');
        expect(typeof lib.array).toBe('function');
    });
});
