import { environment } from './environment.js';

const security = {
    cors: {
        origin: undefined,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
        allowHeaders: ['content-type', 'authorization', 'x-refresh-token'],
        exposeHeaders: ['authorization', 'x-refresh-token'],
        credentials: false,
        maxAge: 604_800, // 7d * 24h * 60m * 60s
        optionsSuccessStatus: 204,
    },
};

const other = {
    bodyParser: {
        enableTypes: ['json'],
        encoding: 'utf-8',
        jsonLimit: '320kb',
        strict: true,
    },
};

export { security, other };
