/**
 * Util file which includes functions that return the cache keys
 * which is used to store in redis.
 */
import { Constants } from '../constants/constant';

/**
 * @param userId 
 * @param userId cache key
 */
const getJWTCacheKey = (jwt: string) => {
  if (jwt === '') {
    throw new Error(`jwt can't be empty`);
  }
  return `${Constants.JWTPrefix}_${jwt}`;
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
  getJWTCacheKey,
  getCountryCacheKey,
  getConvertorCacheKey
};
