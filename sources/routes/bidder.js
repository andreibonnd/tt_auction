import Router from '@koa/router';
import { bidder } from './../controllers/index.js';

const router = new Router({ prefix: '/bidder' });
router
    // @ts-ignore
    .get('/', bidder.getBid); // /?ip=[IP]&ua=[USER_AGENT]

export { router };
