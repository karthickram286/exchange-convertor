import _ from 'lodash';

import * as config from '../config/config.json';
import { getKey, setKeyWithTTL } from '../accessor/redis.accessor';

type CallBackFunc = () => any;

const _getValueFromCache = async (key: string) => {
  try {
    let val = await getKey(key);

    if (!_.isUndefined(val) && !_.isEmpty(val)) {
      console.log(`Cache hit. Key: ${key}`);
      return JSON.parse(val);
    }
    console.log(`Cache miss. Key: ${key}`);
    return null;
  } catch (error) {
    console.log(`Cache miss. Key: ${key}, Error: ${error}`);
    return null;
  }
};

const _putValueToCache = async (key: string, val: string) => {
  try {
    let expireTime = _.get(config, 'service.cache.expireInSeconds');
    await setKeyWithTTL(key, val, expireTime);

    console.log(`Stored in cache`);
  } catch (error) {
    console.log(`Not able to put into cache. Error: ${error}`);
  }
};

const getFromCache = async (cacheKey: string, callback: CallBackFunc) => {
  let cacheVal = await _getValueFromCache(cacheKey);
  if (cacheVal != null) {
    return cacheVal;
  } else {
    let originalValue = await callback();
    await _putValueToCache(cacheKey, JSON.stringify(originalValue));
    return originalValue;
  }
}


export {
  getFromCache
};