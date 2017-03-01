// predicate can receive conditions item by states and 
// if you return true, you will quit the iteration
const atcon = (() => {

    // iterator can receive breaker to return and then this reduce will break
    // inspired by Underscore.js 1.6.0
    const reduce = (array, iterator, initialValue) => {
        const breaker = {};
        let value = initialValue;

        array.some((v) => {
            value = iterator(value, v, breaker);
            if (value === breaker) {
                return true;
            }
        });
    };

    const atcon = (conditions, states, predicate) => {
        reduce(states, (conditions, state, breaker) => {
            return !conditions || !conditions[state] || predicate(conditions[state]) ? breaker : conditions[state]
        }, conditions);
    };

    // the result is judged by the predicate returned true
    // if you don't return true, you can only get undefined
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