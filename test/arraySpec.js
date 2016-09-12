'use strict';

var parse = require('../lib/array');

describe('Array/Positive', function () {

});

describe('Array/Negative', function () {

    it("must throw on invalid input types", function () {
        var typeErr = 'Invalid tuple array type: ';
        expect(function () {
            parse();
        }).toThrow(new TypeError(typeErr + typeof undefined));
        expect(function () {
            parse(null);
        }).toThrow(new TypeError(typeErr + typeof null));
        expect(function () {
            parse(123);
        }).toThrow(new TypeError(typeErr + typeof 123));
    });

    it("must throw on invalid input syntax", function () {
        var syntaxErr = 'Invalid tuple array syntax: ';
        expect(function () {
            parse('');
        }).toThrow(new TypeError(syntaxErr));
        expect(function () {
            parse('hello');
        }).toThrow(new TypeError(syntaxErr + 'hello'));
        expect(function () {
            parse('{');
        }).toThrow(new TypeError(syntaxErr + '{'));
        expect(function () {
            parse('}');
        }).toThrow(new TypeError(syntaxErr + '}'));
    });

});
