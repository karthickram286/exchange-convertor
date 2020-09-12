/**
 * Util file which includes functions that return the cache keys
 * which is used to store in redis.
 */
import { Constants } from '../constants/constant';

/**
 * @param username 
 * @returns Username cache key
 */
const getUserNameCacheKey = (username: string) => {
  if (username === '') {
    throw new Error(`username can't be empty`);
  }
  return `${Constants.UserNamePrefix}_${username}`;
};

/**
 * @param userId 
 * @param userId cache key
 */
const getUserIdCacheKey = (userId: string) => {
  if (userId === '') {
    throw new Error(`userId can't be empty`);
  }
  return `${Constants.UserIdPrefix}_${userId}`;
};

/**
 * @param searchKey 
 * @returns country cache key
 */
const getCountryCacheKey = (searchKey: string) => {
  if (searchKey === '') {
    throw new Error(`searchKey can't be empty`);
  }
  return `${Constants.CountryPrefix}_${searchKey}`;
};

/**
 * @param currencies 
 * @returns convertor cache key
 */
const getConvertorCacheKey = (currencies: string) => {
  if (currencies === '') {
    throw new Error(`currencies can't be empty`);
  }
  return `${Constants.ConvertorPrefix}_${currencies}`;
}

export {
  getUserNameCacheKey,
  getUserIdCacheKey,
  getCountryCacheKey,
  getConvertorCacheKey
};
