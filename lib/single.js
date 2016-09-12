'use strict';

function parseSingle(txt, cb) {
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

module.exports = parseSingle;
