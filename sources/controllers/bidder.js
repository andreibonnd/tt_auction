import { bidder } from './../services/index.js';
import { status } from './../helpers/constants.js';

async function getBid(context) {
    const query = context.request.query;

    if (query.ip === undefined || query.ua === undefined)
        context.throw(status.bad_request, 'Required parameter missing');
    if (query.ip?.length < 7 || query.ip?.length > 45)
        context.throw(status.bad_request, 'IP length is too short for IPv4 or too long for IPv6');
    if (query.ua?.length < 10) context.throw(status.bad_request, 'UA length is too short');

    context.response.body = await bidder.getBid(query, context.throw);
}

export { getBid };
