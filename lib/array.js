'use strict';

function parseArray(txt, cb) {
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

module.exports = parseArray;
