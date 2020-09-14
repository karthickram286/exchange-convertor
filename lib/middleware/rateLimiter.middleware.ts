import { RequestHandler } from 'express';
import _ from 'lodash';

import { incrCount, getKey, setKeyWithTTL } from '../accessor/redis.accessor';
import * as config from '../config/config.json';
import { getJWTCacheKey } from '../util/cacheKey';

/**
 * Limits the number of requests made by the user based on his auth token
 * If the user crossed his limits it will throw an error and the request won't pass through this middleware
 * 
 * @param req 
 * @param res 
 * @param next 
 */
const rateLimiter: RequestHandler = async (req, res, next) => {

  const token: any = req.header('x-auth-token');
  let key = getJWTCacheKey(token);

  let count = parseInt(await getKey(key));

  let maxRequests = _.get(config, 'service.rateLimit.maxRequests');
  if (count > maxRequests) {
    return res.status(429)
      .json({ message: 'Too many requests from this token. Try again later' });
  }

  if (!count) {
    let expireTime = _.get(config, 'service.rateLimit.expireInSeconds');
    await setKeyWithTTL(key, "1", expireTime);
  } else {
    await incrCount(key);
  }
  
  next();
};

export {
  rateLimiter
};