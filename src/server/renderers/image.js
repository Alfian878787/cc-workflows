import pick from 'lodash/pick';
import http from 'http';
import request from 'request';
import { Caman } from 'caman';

const CAMAN_FILTERS = [
    'brightness',
    'vibrance',
    'hue',
    'gamma',
    'clip',
    'stackBlue',
    'contrast',
    'saturation',
    'exposure',
    'sepia',
    'noise',
    'sharpen',
    'vintage',
    'lomo',
    'clarity',
    'sinCity',
    'sunrise',
    'crossProcess',
    'orangePeel',
    'love',
    'grungy',
    'jarques',
    'pinhole',
    'oldBoot',
    'glowingSun',
    'hazyDays',
    'herMajesty',
    'nostalgia',
    'hemingway',
    'concentrate'
];

function readImageUrl(url) {
    return new Promise(function(resolve, reject) {
        let req = request.get({
            url,
            encoding: null
        },
        (e, res, body) => {
            if (e) { reject(e); }
            else { resolve(body); }
        });
    });
}

/**
Renders a rule result as an image, taking it's `url` key
and streaming the remote response to the user
**/
export default function renderImage(result, req, res) {
    let filters = pick(req.query, CAMAN_FILTERS)

    // If no filters need applying, pipe straight out
    if (Object.keys(filters) < 1) {
        return request.get(result.url).pipe(res);
    }

    // Otherwise buffer the image into memory
    let image = readImageUrl(result.url)

    // Apply filters via Caman
    .then((image) => {
        return Caman(image, function() {
            // Apply all valid filters
            for (let [key, value] of Object.entries(filters)) {
                if (this[key]) {
                    this[key](value);
                }
            }

            // Render and stream to the response
            this.render(() => {
                this.canvas.pngStream().pipe(res);
            });
        });
    })

    // Handle any errors as `Internal Server Error`
    .catch((e) => res.sendStatus(500));
}
