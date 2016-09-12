'use strict';

var single = require('../lib/single');

describe('Single/Positive', function () {
    it("must accept a single space", function () {
        expect(single('( )')).toEqual([' ']);
    });
    it("must accept a single digit", function () {
        expect(single('(0)')).toEqual(['0']);
    });
    it("must accept double quotes", function () {
        expect(single('("")')).toEqual(['']);
        expect(single('("""")')).toEqual(['"']);
        expect(single('("""""")')).toEqual(['""']);
    });
    it("must accept back-slashes", function () {
        expect(single('(\\\\\\\\)')).toEqual(['\\']);
        expect(single('(\\\\\\\\,\\\\\\\\)')).toEqual(['\\', '\\']);
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
            single();
        }).toThrow(new TypeError(typeErr + typeof undefined));
        expect(function () {
            single(null);
        }).toThrow(new TypeError(typeErr + typeof null));
        expect(function () {
            single(123);
        }).toThrow(new TypeError(typeErr + typeof 123));
    });

    it("must throw on invalid input syntax", function () {
        var syntaxErr = 'Invalid tuple syntax: ';
        expect(function () {
            single('');
        }).toThrow(new TypeError(syntaxErr));
        expect(function () {
            single('hello');
        }).toThrow(new TypeError(syntaxErr + 'hello'));
        expect(function () {
            single('(');
        }).toThrow(new TypeError(syntaxErr + '('));
        expect(function () {
            single(')');
        }).toThrow(new TypeError(syntaxErr + ')'));
        expect(function () {
            single('()');
        }).toThrow(new TypeError(syntaxErr + '()'));
    });

});
