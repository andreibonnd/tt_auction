import Router from '@koa/router';
import { fake } from './../controllers/index.js';

const router = new Router({ prefix: '/fake' });
router
    // @ts-ignore
    .get('/empty', fake.empty)
    .get('/url/:bid', fake.url);

export { router };
