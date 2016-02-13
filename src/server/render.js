import * as renderers from './renderers/index';

export default function renderResult(result, req, res) {
    let { type } = result;

    let renderer = renderers[type];
    if (!renderer) {
        throw new Error(`No valid renderer found for type: ${type}`);
    }

    return renderer(result, req, res);
}
