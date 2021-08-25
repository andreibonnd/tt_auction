import redis from 'redis';
import { promisify } from 'util';
import { environment } from './../configuration/index.js';

const connection = redis.createClient(environment.connections.redis);
// @ts-ignore
connection.on('error', (error) => console.error(`[redis]: ${error.message}`));

// @ts-ignore
const setAsync = promisify(connection.set).bind(connection);
// @ts-ignore
const getAsync = promisify(connection.get).bind(connection);

export { connection, setAsync, getAsync };
