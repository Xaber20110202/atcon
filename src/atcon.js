const atcon = (() => {

    const isUndefined = obj => obj === void 0;

    // iterator can receive breaker to return and then this reduce will be breaked
    // and it also receive values, for the situation that we need look back upon
    // inspired by Underscore.js 1.6.0
    const reduce = (array, iterator, initialValue) => {
        const breaker = {};
        let value = initialValue;
        // upper levels
        let values = [];

        array.some((v) => {
            values.push(value);
            value = iterator(value, v, breaker, values);
            if (value === breaker) {
                return true;
            }
        });
    };

    const atcon = (conditions, states, predicate) => {
        reduce(states, (conditions, state, breaker, preConditions) => {
            // our states don't have corresponding value
            // then we can get the default value
            if (isUndefined(conditions) || isUndefined(conditions[state])) {
                preConditions.reverse().some((condition) => {
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
    return (conditions, states, predicate) => {
        let result;
        atcon(conditions, states, (item) => {
            if (predicate(item) === true) {
                result = item;
                return true;
            }
        });
        return result;
    };
})();

export default atcon;