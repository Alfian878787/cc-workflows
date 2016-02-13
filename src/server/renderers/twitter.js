import Twitter from 'twitter';
import winston from 'winston';
import Cache from '../cache';

const CACHE = new Cache({
    maxAge: 1000 * 60
});

// See https://apps.twitter.com for more info
const CONSUMER_KEY = '2x1VS3S9QxdtUjv8M70zw';
const CONSUMER_SECRET = 'YdEmInxZhXUGCvuu9CIyM0eMz4FoA5MuPF1ULmhqu9E';
const ACCESS_TOKEN_KEY = '24029276-NE39fnogsNLziZYbA31jJnAJGaI8UMrah9RbHJfUu';
const ACCESS_TOKEN_SECRET = '3tMaEPwS7syr9gHuh8NSu9evudTrTTlCJjjtNz1vJQ1zN';

/**
Renders a JSON feed of a given twitter username
**/
export default function renderTwitter(result, req, res) {
    let client = new Twitter({
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
        access_token_key: ACCESS_TOKEN_KEY,
        access_token_secret: ACCESS_TOKEN_SECRET
    });

    let params = {
        screen_name: result.username,
        count: Math.min(10, result.count),
        include_rts: result.includeRetweets !== false,
        trim_user: result.trimUser !== false
    };

    // Check the cache first
    let cacheId = JSON.stringify(params);
    if (CACHE.has(cacheId)) {
        let { timestamp, data: cachedData } = CACHE.get(cacheId);

        winston.info(`Using cached tweets from ${new Date(timestamp)}...`);

        return res.send(cachedData);
    }

    // Hit Twitter for some good ole' tweets' n deets'
    client.get('statuses/user_timeline', params, (err, tweets) => {
        if (err) {
            winston.error(err);
            return res.sendStatus(500);
        }

        // Cache the result
        CACHE.set(cacheId, tweets);

        // And send :)
        res.send(tweets);
    });
}
