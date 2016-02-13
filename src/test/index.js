import assert from 'assert';
import execute from '../workflow/execute';
import definition from '../../data/workflows/test.json';

var results = [
    execute(definition.workflow, {
        name: "Paul"
    }),
    execute(definition.workflow, {
        name: "Craig",
        age: 50
    }),
    execute(definition.workflow, {
        name: "Craig",
        age: 29,
        skills: [".NET"]
    }),
    execute(definition.workflow, {
        name: "Craig",
        age: 29,
        employment: ["Full-time"]
    }),
    execute(definition.workflow, {
        name: "Craig",
        age: 29,
        skills: ["JavaScript"]
    }),
    execute(definition.workflow, {
        name: "Craig",
        age: 29,
        employment: ["Unemployed"]
    }),
    execute(definition.workflow, {
        name: "Craig",
        age: 29
    })
];

assert.equal(results.shift().url, 'NOMATCH:NAME');
assert.equal(results.shift().url, 'NOMATCH:AGE');
assert.equal(results.shift().url, 'NOMATCH:EMPLOYMENT_OR_SKILLS');
assert.equal(results.shift().url, 'NOMATCH:EMPLOYMENT_OR_SKILLS');
assert.equal(results.shift().url, 'MATCH:EMPLOYMENT_OR_SKILLS');
assert.equal(results.shift().url, 'MATCH:EMPLOYMENT_OR_SKILLS');

console.info('All tests passed!');
