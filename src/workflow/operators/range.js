export function lessThan(value, param, options) {
    return value < param;
}

export function greaterThan(value, param, options) {
    return value > param;
}

export function lessThanOrEqualTo(value, param, options) {
    return value <= param;
}

export function greaterThanOrEqualTo(value, param, options) {
    return value >= param;
}

// Aliases
export {
    lessThan as lt,
    greaterThan as gt,
    lessThanOrEqualTo as lte,
    greaterThanOrEqualTo as gte
};
