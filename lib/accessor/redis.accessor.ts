import { redisClient } from '../connection/redis.connection';

import { promisify } from 'util';


const incrCount = async (key: string) => {
  const incrAsync = promisify(redisClient.incr).bind(redisClient);
  await incrAsync(key);
};

const getKey = async (key: string) => {
  const getAsync = promisify(redisClient.get).bind(redisClient);
  return await getAsync(key);
};

const setKeyWithTTL = async (key: string, val: string) => {
  await redisClient.setex(key, 60, val);
};

export {
  incrCount,
  getKey,
  setKeyWithTTL
};