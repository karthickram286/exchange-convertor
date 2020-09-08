import { redisClient } from '../connection/redis.connection';

import { promisify } from 'util';
import _ from 'lodash';

let incrAsync: any = null;
let getAsync: any = null;

const incrCount = async (key: string) => {
  if (incrAsync == null) {
    incrAsync = promisify(redisClient.incr).bind(redisClient);
  }
  await incrAsync(key);
};

const getKey = async (key: string) => {
  if (getAsync == null) {
    getAsync = promisify(redisClient.get).bind(redisClient);
  }
  return await getAsync(key);
};

const setKeyWithTTL = async (key: string, val: string, expireTime: number) => {
  await redisClient.setex(key, expireTime, val);
};

export {
  incrCount,
  getKey,
  setKeyWithTTL
};