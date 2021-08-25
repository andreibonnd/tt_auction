import Router from '@koa/router';
import { auction } from './../controllers/index.js';

const router = new Router({ prefix: '/auction' });
router
    // @ts-ignore
    .get('/:partner_id', auction.chooseBid); // /?ip=[IP]&ua=[USER_AGENT]

export { router };
