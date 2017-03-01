"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// predicate can receive conditions item by states and 
// if you return true, you will quit the iteration
var atcon = function () {

    // iterator can receive breaker to return and then this reduce will break
    // inspired by Underscore.js 1.6.0
    var reduce = function reduce(array, iterator, initialValue) {
        var breaker = {};
        var value = initialValue;

        array.some(function (v) {
            value = iterator(value, v, breaker);
            if (value === breaker) {
                return true;
            }
        });
    };

    var atcon = function atcon(conditions, states, predicate) {
        reduce(states, function (conditions, state, breaker) {
            return !conditions || !conditions[state] || predicate(conditions[state]) ? breaker : conditions[state];
        }, conditions);
    };

    // the result is judged by the predicate returned true
    // if you don't return true, you can only get undefined
    return function (conditions, states, predicate) {
        var result = void 0;
        atcon(conditions, states, function (item) {
            if (predicate(item) === true) {
                result = item;
                return true;
            }
        });
        return result;
    };
}();

exports.default = atcon;
module.exports = exports["default"];
