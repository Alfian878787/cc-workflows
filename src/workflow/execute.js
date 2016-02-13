import * as operators from './operators/index';

export function executeRule(rule, params) {
    let method = operators[rule.operator];
    if (!method) {
        throw new Error('Invalid operator: ' + rule.operator);
    }

    let value = params[rule.operand];
    return method(value, rule.value, rule.options);
}

export function executeGroup(group, params) {
    switch (group.condition) {
        case 'and':
            return group.rules.every(function(rule) {
                return executeRule(rule, params);
            });

        case 'or':
            return group.rules.some(function(rule) {
                return executeRule(rule, params);
            });

        default:
            throw new Error('Invalid group condition: ' + group.condition);
    }
}

export default function execute(definition, params) {
    let isMatch;

    // Execution
    switch (definition.type) {
        case 'matchRule':
            isMatch = executeRule(definition, params);
            break;

        case 'group':
            isMatch = executeGroup(definition, params);
            break;

        case 'image':
        case 'asset':
            return definition;

        default:
            throw new Error('Encountered invalid type: ' + definition.type);
    }

    if (isMatch) {
        return execute(definition.match, params);
    }

    return execute(definition.noMatch, params);
}
