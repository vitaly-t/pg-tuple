'use strict';

/**
 *
 * @param tuple
 * @param cb
 * @returns {string[]|Object}
 */
function parseSingle(tuple, cb) {
    if (typeof tuple !== 'string') {
        throw new TypeError('Invalid tuple type: ' + typeof(tuple));
    }
    if (!tuple.match(/^\((.+)\)$/g)) {
        throw new TypeError('Invalid tuple syntax: ' + tuple);
    }
    var i = 1, quotes = 0, startIdx = 1, data = [];
    while (i < tuple.length) {
        var a = tuple[i];
        if ((a === ',' || i === tuple.length - 1) && !(quotes % 2)) {
            var s = tuple.substr(startIdx, i - startIdx);
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
