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

function parseTuple(txt, cb) {
    if (typeof txt !== 'string') {
        throw new TypeError('Invalid tuple type: ' + typeof(txt));
    }
    if (!txt.match(/^\((.+)\)$/g)) {
        throw new TypeError('Invalid tuple syntax: ' + txt);
    }
    var i = 1, quotes = 0, startIdx = 1, data = [];
    while (i < txt.length) {
        var a = txt[i];
        if ((a === ',' || i === txt.length - 1) && !(quotes % 2)) {
            var s = txt.substr(startIdx, i - startIdx);
            s = s.replace(/^"|"$/g, '').replace(/"{2}/g, '"').replace(/\\{4}/g, '\\');
            data.push(s);
            startIdx = i + 1;
            quotes = 0;
        }
        if (a === '"') {
            quotes++;
        }
        i++;
    }
    if (typeof cb === 'function') {
        var res = {};
        cb.call(res, data, res);
        return res;
    }

    return data;
}

function splitTuples(txt, cb) {
    if (typeof txt !== 'string') {
        throw new TypeError('Invalid tuple array type: ' + typeof txt);
    }
    if (!txt.match(/^\{(.+)}$/g)) {
        throw new TypeError('Invalid tuple array syntax: ' + txt);
    }
    cb = typeof cb === 'function' ? cb : null;
    var i = 1, idx = 0, quotes = 0, startIdx = -1, data = [];
    while (i < txt.length) {
        var a = txt[i];
        if (!(quotes % 2)) {
            if (a === '(' && startIdx < 0) {
                startIdx = i;
            }
            if (a === ')' && startIdx >= 0) {
                var s = txt.substr(startIdx, i - startIdx + 1);
                data.push(cb ? cb(s, idx++) : s);
                startIdx = -1;
                quotes = 0;
            }
        }
        if (a === '"') {
            quotes++;
        }
        i++;
    }
    return data;
}

module.exports = {
    isSingle: isSingle,
    isArray: isArray,
    single: single,
    array: array
};
