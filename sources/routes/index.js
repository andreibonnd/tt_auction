import Router from '@koa/router';
import { router as bidder } from './bidder.js';
import { router as auction } from './auction.js';
import { router as fake } from './fake.js';

const routes = new Router({ prefix: '/api' });
routes.use(bidder.routes(), bidder.allowedMethods());
routes.use(auction.routes(), auction.allowedMethods());
routes.use(fake.routes(), fake.allowedMethods());

export { routes };
