'use strict';

var parse = require('../lib/array');

describe('Array/Positive', function () {

    it("simple arrays of values", function () {
        expect(parse('{"(2,two)","(3,three)","(4,four)"}')).toEqual([
            '(2,two)', '(3,three)', '(4,four)'
        ]);
    });
/*
    it("composite value + array", function () {
        expect(parse('("(7,inner)","{""(8,eight)"",""(9,nine)""}")')).toEqual([
            '(7,inner)', '{""(8,eight)"",""(9,nine)""}'
        ]);
    });
    it("fully composite arrays", function () {
        // Q: Should we replace inner '\\"' at this point?
        // A: Yeah, most likely!
        expect(parse('{"(\\"(7,inner)\\",\\"{\\"\\"(88,eight-1)\\"\\",\\"\\"(99,nine-2)\\"\\"}\\")","(\\"(77,inner)\\",\\"{\\"\\"(888,eight-3)\\"\\",\\"\\"(999,nine-4)\\"\\"}\\")"}'))
            .toEqual([
                '(\\"(7,inner)\\",\\"{\\"\\"(88,eight-1)\\"\\",\\"\\"(99,nine-2)\\"\\"}\\")',
                '(\\"(77,inner)\\",\\"{\\"\\"(888,eight-3)\\"\\",\\"\\"(999,nine-4)\\"\\"}\\")'
            ]);
    });
    it("nested arrays", function () {
        expect(parse('{{"(11,q1)","(22,q2)"},{"(33,e1)","(44,e2)"}}'))
            .toEqual([
                '{"(11,q1)","(22,q2)"}',
                '{"(33,e1)","(44,e2)"}'
            ]);
    });
*/
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
