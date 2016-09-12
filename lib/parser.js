'use strict';

/*
 Regular tuples:
 [ '(1,hello)',
 '(2,"one, two three")',
 '(3,"last\\\\""")',
 '(4,"tricky"" a bit")',
 '(5,"Hi "" a bit")',
 '(6,"Hi "" a bit")',
 '(7,"\\\\ a bit")',
 '(8,"\\\\\\\\ a bit")',
 '(9,"\\\\s a bit")',
 '(10,"/s a bit")' ]

 * This is what we are getting for an array of tuples:
 * [ '{"(1,first)","(2,second)"}' ]
 *
 *This is what we are getting for composite tuples (tuple type used inside another tuple):
 * [ '(1,"(2,second)")' ]
 *
 * */

// TODO: The parsers will be implemented here

// TODO: Should this include PostgreSQL tests?

function single(tuple, cb) {
    if (typeof cb === 'function') {
        // return a new object;

        // cb(obj, data)
        // this = data?
    } else {
        // return an array of strings;
    }
}

function array(tuples, cb) {
    if (typeof cb === 'function') {
        // return an array of values returned by cb;
        // cb(tuple, index)
    } else {
        // return an array of tuples;
    }
}

// verifies if data represents a valid single-tuple string;
function isSingle(data) {
    // return data && typeof data === 'string' && /*is valid single tuple*/
}

// verifies if data represents a valid array of tuples;
function isArray(data) {
    // return data && typeof data === 'string' && /*is valid array of tuples*/
}

/*

 Examples:

 var res = single('(1,text)', (obj, data)=> {
 obj.a = parseInt(data[0]);
 obj.b = data[1];
 });

 var res = array('{"(1,first)","(2,second)"}', tuple=> {
 return single(tuple, (obj, data)=> {
 obj.a = parseInt(data[0]);
 obj.b = data[1];
 });
 });

 */

function splitTuples(txt) {
    var i = 0, quotes = 0, a, startIdx = -1, tuples = [];
    while (i < txt.length) {
        a = txt[i];
        if (!(quotes % 2)) {
            if (a === '(' && startIdx < 0) {
                startIdx = i;
            }
            if (a === ')' && startIdx >= 0) {
                tuples.push(txt.substr(startIdx, i - startIdx + 1));
                startIdx = -1;
                quotes = 0;
            }
        }
        if (a === '"') {
            quotes++;
        }
        i++;
    }
    return tuples;
}

module.exports = {
    isSingle: isSingle,
    isArray: isArray,
    single: single,
    array: array
};
