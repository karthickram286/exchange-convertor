import { RequestHandler } from 'express';
import _ from 'lodash';

import { incrCount, getKey, setKeyWithTTL } from '../accessor/redis.accessor';
import * as config from '../config/config.json';

const rateLimiter: RequestHandler = async (req, res, next) => {

  const token: any = req.header('x-auth-token');

  let count = parseInt(await getKey(token));

  let maxRequests = _.get(config, 'service.rateLimit.maxRequests');
  if (count > maxRequests) {
    return res.status(429)
      .json({ message: 'Too many requests from this token. Try again later' });
  }

  if (!count) {
    let expireTime = _.get(config, 'service.rateLimit.expireInSeconds');
    await setKeyWithTTL(token, "1", expireTime);
  } else {
    await incrCount(token);
  }
  
  next();
};

export {
  rateLimiter
};