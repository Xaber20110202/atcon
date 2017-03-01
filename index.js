"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var atcon = function () {

    var isUndefined = function isUndefined(obj) {
        return obj === void 0;
    };

    // iterator can receive breaker to return and then this reduce will be breaked
    // and it also receive values, for the situation that we need look back upon
    // inspired by Underscore.js 1.6.0
    var reduce = function reduce(array, iterator, initialValue) {
        var breaker = {};
        var value = initialValue;
        // upper levels
        var values = [];

        array.some(function (v) {
            values.push(value);
            value = iterator(value, v, breaker, values);
            if (value === breaker) {
                return true;
            }
        });
    };

    var atcon = function atcon(conditions, states, predicate) {
        reduce(states, function (conditions, state, breaker, preConditions) {
            // our states don't have corresponding value
            // then we can get the default value
            if (isUndefined(conditions) || isUndefined(conditions[state])) {
                preConditions.reverse().some(function (condition) {
                    // use predicate to break some func
                    return predicate(condition && condition.__DEFAULT__);
                });
                return breaker;
            } else {
                return predicate(conditions[state]) ? breaker : conditions[state];
            }
        }, conditions);
    };

    // predicate can receive conditions item by states and 
    // the result is judged by the predicate returned true.
    // if you return true, you will quit the iteration
    // if you don't return true, you will only get undefined
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
