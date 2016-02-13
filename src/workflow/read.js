import fs from 'fs';
import path from 'path';

const WORFKLOWS_DIR = path.join(__dirname, '..', '..', 'data', 'workflows');

function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, result) => {
            if (err) { reject(err); }
            else { resolve(result); }
        });
    });
}

export default async function readWorkflow(name) {
    const filePath = path.join(WORFKLOWS_DIR, `${name}.json`);
    let result = await readFile(filePath);

    return JSON.parse(result.toString());
}
