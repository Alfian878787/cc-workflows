import express from 'express';
import * as routers from './routers/index';

const app = express();

for (let router of Object.values(routers)) {
    app.use('/', router);
}

export default function start(PORT = 3000) {
    return new Promise(function(resolve) {
        app.listen(PORT, () => {
            console.log('Example app listening on port 3000!');
            resolve(app);
        });
    })
}
