import fetch from 'node-fetch';
import { environment } from './../configuration/index.js';
import { redis } from './../connections/index.js';
import { status } from './../helpers/constants.js';

/**
 * @argument { Object } details
 * @argument { String } details.partner_id
 * @argument { String } details.ip
 * @argument { String } details.ua
 * @argument { Function } _throw
 * @returns { Promise<String> } URL
 */
async function chooseBid(details, _throw) {
    const ipLimit = Number(await redis.getAsync(details.ip));
    if (ipLimit >= environment.auction.requestsLimit) return `${environment.server.apiURL}/fake/empty`;

    const URL = `${environment.server.apiURL}/bidder?ip=${details.ip}&ua=${details.ua}`;
    const biggerBid = { value: 0, url: '' };

    const bids = await Promise.allSettled([...Array(3)].map(() => fetch(URL, { method: 'get' })));
    for (const result of bids) {
        if (result.status === 'fulfilled') {
            const response = await result.value.json();
            console.log(response.bid);

            if (response.bid > biggerBid.value) {
                biggerBid.value = response.bid;
                biggerBid.url = response.url;
            }
        } else if (result.status == 'rejected') {
            console.warn(`Reason: ${result.reason}`);
        }
    }

    if (biggerBid.value === 0) _throw(status.not_found, 'There are no bids in the auction');
    await redis.setAsync(details.ip, ipLimit + 1 || 1);

    return biggerBid.url;
}

export { chooseBid };
