'use strict';

var parse = require('../lib/single');

describe('Single/Positive', function () {
    it("must accept a single space", function () {
        expect(parse('( )')).toEqual([' ']);
    });
    it("must accept a single digit", function () {
        expect(parse('(0)')).toEqual(['0']);
    });
    it("must accept double quotes", function () {
        expect(parse('("")')).toEqual(['']);
        expect(parse('("""")')).toEqual(['"']);
        expect(parse('("""""")')).toEqual(['""']);
    });
    it("must accept back-slashes", function () {
        expect(parse('(\\\\\\\\)')).toEqual(['\\']);
        expect(parse('(\\\\\\\\,\\\\\\\\)')).toEqual(['\\', '\\']);
    });
    /*
     it("must accept empty strings", function () {
     expect(single('(,"",,"""",)')).toEqual(['', '', '', '""']);
     });
     */
});

describe('Single/Negative', function () {

    it("must throw on invalid input types", function () {
        var typeErr = 'Invalid tuple type: ';
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
        var syntaxErr = 'Invalid tuple syntax: ';
        expect(function () {
            parse('');
        }).toThrow(new TypeError(syntaxErr));
        expect(function () {
            parse('hello');
        }).toThrow(new TypeError(syntaxErr + 'hello'));
        expect(function () {
            parse('(');
        }).toThrow(new TypeError(syntaxErr + '('));
        expect(function () {
            parse(')');
        }).toThrow(new TypeError(syntaxErr + ')'));
        expect(function () {
            parse('()');
        }).toThrow(new TypeError(syntaxErr + '()'));
    });

});
