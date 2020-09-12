import { describe } from 'mocha';
import { expect } from 'chai';

import { getUserNameCacheKey, getUserIdCacheKey, getCountryCacheKey, getConvertorCacheKey } from '../../../lib/util/cacheKey';
import { Constants } from '../../../lib/constants/constant';

describe ('CacheKey Util', () => {

  describe ('getUserNameCacheKey', () => {

    it ('should return key with username prefix', () => {
      let cacheKey = getUserNameCacheKey('username');

      let expectedKey = `${Constants.UserNamePrefix}_username`;
      expect(cacheKey).to.equal(expectedKey);
    });

    it ('should throw error', () => {
      
      expect(() => getUserNameCacheKey('')).to.throw(`username can't be empty`);
    });
  });

  describe ('getUserIdCacheKey', () => {

    it ('should return key with username prefix', () => {
      let cacheKey = getUserIdCacheKey('df336ae9-ae23-4f81-8cfc-e090a1d938fe');

      let expectedKey = `${Constants.UserIdPrefix}_df336ae9-ae23-4f81-8cfc-e090a1d938fe`;
      expect(cacheKey).to.equal(expectedKey);
    });

    it ('should throw error', () => {
      
      expect(() => getUserIdCacheKey('')).to.throw(`userId can't be empty`);
    });
  });

  describe ('getCountryCacheKey', () => {

    it ('should return key with username prefix', () => {
      let cacheKey = getCountryCacheKey('rus');

      let expectedKey = `${Constants.CountryPrefix}_rus`;
      expect(cacheKey).to.equal(expectedKey);
    });

    it ('should throw error', () => {
      
      expect(() => getCountryCacheKey('')).to.throw(`searchKey can't be empty`);
    });
  });

  describe ('getConvertorCacheKey', () => {

    it ('should return key with username prefix', () => {
      let cacheKey = getConvertorCacheKey('GBP,INR,JPY,RUB,SEK,USD');

      let expectedKey = `${Constants.ConvertorPrefix}_GBP,INR,JPY,RUB,SEK,USD`;
      expect(cacheKey).to.equal(expectedKey);
    });

    it ('should throw error', () => {
      
      expect(() => getConvertorCacheKey('')).to.throw(`currencies can't be empty`);
    });
  });
  
});