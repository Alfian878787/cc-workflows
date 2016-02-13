import express from 'express';
import * as workflow from '../../workflow/index';
import render from '../render';

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
    workflowHandler(
        req.params.workflow,
        req.query
    )
    .then(({ definition, result }) => {
        render(result, req, res);
    })
    .catch((err) => {
        res.status(500).send(err.toString());
    });
});

export default router;
