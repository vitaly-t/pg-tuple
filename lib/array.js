'use strict';

// TODO: Need to update for proper array trims + nested array support.

/*
 -- create type typeA as (
 --    a int,
 --    b text
 --  );
 --
 --  create type typeB as (
 --    c typeA,
 --    d typeA[]
 -- );

 --  create table tst(
 -- id serial primary key,
 -- singleA typeA null,
 -- arrA typeA[] null,
 -- singleB typeB null,
 -- arrB typeB[] null,
 -- multA typeA[][] null
 -- );

 insert into tst(singleA, arrA, singleB, arrB, multA) values (
 (1,'hello'),
 array[(2, 'two'),(3,'three')]::typeA[],
 ((7,'inner'),array[(8, 'eight'),(9, 'nine')]::typeA[]),
 array[((7,'inner'),array[(88, 'eight-1'),(99, 'nine-2')]::typeA[]),((77,'inner'),array[(888, 'eight-3'),(999, 'nine-4')]::typeA[])]::typeB[],
 array[array[(11, 'q1'),(22, 'q2')]::typeA[], array[(33, 'e1'),(44, 'e2')]::typeA[]]::typeA[][]
 );

 select * from tst...

 column-by-column:

 (1,hello)
 {"(2,two)","(3,three)"}
 ("(7,inner)","{""(8,eight)"",""(9,nine)""}")
 => (7,inner)
 => {""(8,eight)"",""(9,nine)""}
 => (8,eight)
 => (9,nine)
 {"(\"(7,inner)\",\"{\"\"(88,eight-1)\"\",\"\"(99,nine-2)\"\"}\")","(\"(77,inner)\",\"{\"\"(888,eight-3)\"\",\"\"(999,nine-4)\"\"}\")"}
 => (\"(7,inner)\",\"{\"\"(88,eight-1)\"\",\"\"(99,nine-2)\"\"}\")
 => (7,inner), {\"\"(88,eight-1)\"\",\"\"(99,nine-2)\"\"}
 => (\"(77,inner)\",\"{\"\"(888,eight-3)\"\",\"\"(999,nine-4)\"\"}\")
 {{"(11,q1)","(22,q2)"},{"(33,e1)","(44,e2)"}}

 Direct access outputs:

 singlea: '(1,hello)',
 arra: '{"(2,two)","(3,three)"}',
 singleb: '("(7,inner)","{""(8,eight)"",""(9,nine)""}")',
 arrb: '{"(\\"(7,inner)\\",\\"{\\"\\"(88,eight-1)\\"\\",\\"\\"(99,nine-2)\\"\\"}\\")","(\\"(77,inner)\\",\\"{\\"\\"(888,eight-3)\\"\\",\\"\\"(999,nine-4)\\"\\"}\\")"}',
 multa: '{{"(11,q1)","(22,q2)"},{"(33,e1)","(44,e2)"}}' }

 */

// {"(2,two)","(3,three)","(4,four)"}
/**
 *
 * @param tuple
 * @param cb
 * @returns {string[]|Object}
 */
function parseArray(tuple, cb) {
    if (typeof tuple !== 'string') {
        throw new TypeError('Invalid tuple array type: ' + typeof tuple);
    }
    if (!tuple.match(/^\{(.+)}$/g)) {
        throw new TypeError('Invalid tuple array syntax: ' + tuple);
    }
    cb = typeof cb === 'function' ? cb : null;
    var i = 1, idx = 0, quotes = 0, startIdx = -1, data = [];
    while (i < tuple.length) {
        var a = tuple[i];

        if (a === '"') {
            quotes++;

            if (quotes % 2) {
                // odd
            } else {
                // even
            }
        }

        if (!(quotes % 2)) {
            if (a === '"') {
                if (startIdx < 0) {
                    startIdx = i;
                } else {
                    var s = tuple.substr(startIdx, i - startIdx - 1);
                    data.push(cb ? cb.call(data, s, idx++) : s);
                    startIdx = -1;
                    quotes = 0;
                }
            }

            /*
             if (a === '"' && startIdx < 0) {
             startIdx = i;
             }

             if (a === ')' && startIdx >= 0) {
             var s = tuple.substr(startIdx, i - startIdx + 1);
             data.push(cb ? cb.call(data, s, idx++) : s);
             startIdx = -1;
             quotes = 0;
             }*/
        }
        if (a === '"') {
            quotes++;
        }
        i++;
    }
    return data;
}

module.exports = parseArray;
