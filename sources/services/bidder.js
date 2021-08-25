import { environment } from './../configuration/index.js';

/**
 * @argument { Object } details
 * @argument { String } details.ip
 * @argument { String } details.ua
 * @argument { Function } _throw
 * @returns { Promise<{ bid: Number, url: String }> }
 *  - bid: Random float number between 1..10
 *  - url: Random url (url-encoded string)
 */
async function getBid(details, _throw) {
    const BID_MIN = environment.auction.bid.min,
        BID_MAX = environment.auction.bid.max;
    const bid = Math.random() * (BID_MAX - BID_MIN) + BID_MIN;

    const url = encodeURI(`${environment.server.apiURL}/fake/url/${bid}`);

    return { bid, url };
}

export { getBid };
