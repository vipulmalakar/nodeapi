import { Redis, RedisOptions } from 'ioredis';


export const REDIS_CREDENTIALS: RedisOptions = {
    port: 6379,
    host: '127.0.0.1',
    name: "my-store",
};

export const redis = new Redis(REDIS_CREDENTIALS);
