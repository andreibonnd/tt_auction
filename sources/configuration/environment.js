import env from 'dotenv-defaults';

const root = process.cwd();
env.config({
    path: `${root}/configurations/.env`,
    defaults: `${root}/configurations/.env.defaults`,
});

const {
    SERVER_PORT,
    API_URL,

    REDIS_CONNECTION,

    REQUESTS_LIMIT,
    BID_MIN,
    BID_MAX,
} = process.env;

const environment = {
    server: {
        root,
        port: Number(SERVER_PORT),
        apiURL: API_URL,
    },
    connections: {
        redis: REDIS_CONNECTION,
    },
    auction: {
        requestsLimit: Number(REQUESTS_LIMIT),
        bid: {
            min: Number(BID_MIN),
            max: Number(BID_MAX),
        },
    },
};

export { environment };
