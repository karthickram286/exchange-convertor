import redis from 'redis';
import _ from 'lodash';

import * as config from '../config/config.json';

const env: string = _.get(config, 'service.env');
let redisClient: any;

const connectRedis = () => {
  redisClient = redis.createClient({
    host: _.get(config, `redis.${env}.host`),
    port: _.get(config, `redis.${env}.port`)
  });

  console.log('Redis connection established successfully');
  return redisClient;
};

export {
  connectRedis,
  redisClient
};