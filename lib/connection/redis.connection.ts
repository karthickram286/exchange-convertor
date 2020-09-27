import redis from 'redis';
import _ from 'lodash';

import * as config from '../config/config.json';

const env: any = process.env.NODE_ENV;
let redisClient: any;

/**
 * Establishes connection with Redis
 */
const connectRedis = () => {
  redisClient = redis.createClient({
    host: process.env.REDIS_HOST || _.get(config, `redis.${env}.host`),
    port: _.get(config, `redis.${env}.port`)
  });

  console.log('Redis connection established successfully');
  return redisClient;
};

export {
  connectRedis,
  redisClient
};