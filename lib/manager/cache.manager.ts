/**
 * A module which helps to get and put the values in Redis cache.
 * If the value is already present in cache, it will return the value.
 * If the value is not present, the actual call is done and the result is stored in cache
 * before returning.
 */
import _ from 'lodash';

import * as config from '../config/config.json';
import { getKey, setKeyWithTTL } from '../accessor/redis.accessor';

type CallBackFunc = () => any;

/**
 * Checks whether the value is json or not
 * @param value 
 */
const _isJson = (value: any) => {
  try {
    JSON.parse(value);
  } catch (error) {
    return false;
  }
  return true;
};

/**
 * Parses the value if it's json before returning it
 * @param value 
 */
const _getFinalValueFromRedis = (value: any) => {
  if (_isJson(value))
    return JSON.parse(value);
  return value;
};

/**
 * Stringifies the value if it's json before returning it
 * @param value 
 */
const _getFinalValueToInsert = (value: any) => {
  if (_isJson(value))
    return JSON.stringify(value);
  return value;
};

/**
 * Returns the value for the given key from cache.
 * Note: This is a private method. Exported only for testing.
 * 
 * @scope private
 * @param key 
 */
const _getValueFromCache = async (key: string) => {
  try {
    let val = await getKey(key);

    if (!_.isUndefined(val) && !_.isEmpty(val)) {
      console.log(`Cache hit. Key: ${key}`);
      return _getFinalValueFromRedis(val);
    }
    console.log(`Cache miss. Key: ${key}`);
    return null;
  } catch (error) {
    console.log(`Cache miss. Key: ${key}, Error: ${error}`);
    return null;
  }
};

/**
 * Inserts the key and value in redis with an expire time(from config).
 * Note: This is a private method. Exported only for testing.
 * 
 * @scope private
 * @param key 
 * @param val 
 */
const _putValueToCache = async (key: string, val: string) => {
  try {
    let expireTime = _.get(config, 'service.cache.expireInSeconds');
    await setKeyWithTTL(key, val, expireTime);

    console.log(`Stored in cache`);
  } catch (error) {
    console.log(`Not able to put into cache. Error: ${error}`);
    throw new Error(error);
  }
};

/**
 * Returns value from the cache if it's available.
 * Else executes the call back function and stores it in cache.
 * 
 * @scope public
 * @param cacheKey 
 * @param callback 
 */
const getFromCache = async (cacheKey: string, callback: CallBackFunc) => {
  let cacheVal = await _getValueFromCache(cacheKey);
  if (cacheVal != null) {
    return cacheVal;
  } else {
    let originalValue = await callback();
    if (originalValue != null && !_.isEmpty(originalValue) && !_.isUndefined(originalValue))
      await _putValueToCache(cacheKey, JSON.stringify(originalValue));
    return originalValue;
  }
}

export {
  getFromCache,
  _putValueToCache,
  _getValueFromCache
};