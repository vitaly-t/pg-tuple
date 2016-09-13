'use strict';

// TODO: Need to update for proper array trims + nested array support.

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
        if (!(quotes % 2)) {
            if (a === '(' && startIdx < 0) {
                startIdx = i;
            }
            if (a === ')' && startIdx >= 0) {
                var s = tuple.substr(startIdx, i - startIdx + 1);
                data.push(cb ? cb.call(data, s, idx++) : s);
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
