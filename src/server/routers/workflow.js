import express from 'express';
import * as workflow from '../../workflow/index';
import render from '../render';
import winston from 'winston';

const router = express.Router();

async function workflowHandler(name, params) {
    let definition = await workflow.read(name);
    let result = workflow.execute(definition.workflow, params);

    return {
        definition,
        result
    }
}

router.get('/w/:workflow', (req, res) => {
    let name = req.params.workflow;
    let params = req.query;

    winston.info(`Executing ${name} workflow with params: ${JSON.stringify(params)}`);

    workflowHandler(
        name,
        params
    )
    .then(({ definition, result }) => {
        winston.info(`Workflow result: ${JSON.stringify(result)}`);
        render(result, req, res);
    })
    .catch((err) => {
        res.status(500).send(err.toString());
    });
});

export default router;
