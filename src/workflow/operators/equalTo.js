export function equalTo(value, param, options) {
    return value === param;
}

export function notEqualTo(value, param, options) {
    return !equalTo(value, param);
}
