import { performance } from 'perf_hooks';
import { status } from './../helpers/constants.js';
import { auction } from './../services/index.js';

async function chooseBid(context) {
    const start = performance.now();

    const parameters = context.request.params;
    const query = context.request.query;

    if (parameters.partner_id === undefined || query.ip === undefined || query.ua === undefined)
        context.throw(status.bad_request, 'Required parameter missing');

    if (parameters.partner_id?.length !== 36) context.throw(status.bad_request, 'partner_id is not a uuid');

    if (query.ip?.length < 7 || query.ip?.length > 45)
        context.throw(status.bad_request, 'IP length is too short for IPv4 or too long for IPv6');
    if (query.ua?.length < 10) context.throw(status.bad_request, 'UA length is too short');

    const url = await auction.chooseBid({ ...parameters, ...query }, context.throw);
    context.response.redirect(url);

    console.log(`[performance.chooseBid]: ${performance.now() - start}`);
}

export { chooseBid };
