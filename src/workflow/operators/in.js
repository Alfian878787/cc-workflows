export function isIn(value, params, options) {
    if (value instanceof Array) {
        return value.some(function(val) {
            return isIn(val, params);
        });
    }

    return params.indexOf(value) > -1;
}

export function notIn(value, params, options) {
    return !isIn(value, params);
}

// Aliases
export {
    isIn as in
}
