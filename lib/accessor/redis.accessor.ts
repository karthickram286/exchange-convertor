/**
 * Methods to insert and retrieve values from redis.
 * Here, the redis client calls have been promisified because it doeesn't support promises
 * Refer {@link https://www.npmjs.com/package/redis#promises} for more
 */
import { redisClient } from '../connection/redis.connection';

import { promisify } from 'util';

let incrAsync: any = null;
let getAsync: any = null;

/**
 * Increments the count for this key by one
 * @param key 
 */
const incrCount = async (key: string) => {
  if (incrAsync == null) {
    incrAsync = promisify(redisClient.incr).bind(redisClient);
  }
  await incrAsync(key);
};

/**
 * Returns the value for the given key
 * @param key 
 */
const getKey = async (key: string) => {
  if (getAsync == null) {
    getAsync = promisify(redisClient.get).bind(redisClient);
  }
  return await getAsync(key);
};

/**
 * Inserts a new key with the given value and also sets the given expire time.
 * @param key 
 * @param val 
 * @param expireTime 
 */
const setKeyWithTTL = async (key: string, val: string, expireTime: number) => {
  await redisClient.setex(key, expireTime, val);
};

export {
  incrCount,
  getKey,
  setKeyWithTTL
};