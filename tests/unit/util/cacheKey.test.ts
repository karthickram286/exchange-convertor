import { describe } from 'mocha';
import { expect } from 'chai';

import { getJWTCacheKey, getCountryCacheKey, getConvertorCacheKey } from '../../../lib/util/cacheKey';
import { Constants } from '../../../lib/constants/constant';

describe ('CacheKey Util', () => {

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

  describe ('getJWTCacheKey', () => {

    it ('should return key with jwt prefix', () => {
      let cacheKey = getJWTCacheKey('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiOGVkZjE5LWU4YjktNDRjYS05ZWQxLTE3ZTExM2ZiN2U1NiIsImlhdCI6MTU5OTk4MzQwOSwiZXhwIjoxNjAwMDI2NjA5fQ.b-FZ36yn3tcnNJXcaInq3zmIRU1rdt4RDne6a1VwuUE');

      let expectedKey = `${Constants.JWTPrefix}_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiOGVkZjE5LWU4YjktNDRjYS05ZWQxLTE3ZTExM2ZiN2U1NiIsImlhdCI6MTU5OTk4MzQwOSwiZXhwIjoxNjAwMDI2NjA5fQ.b-FZ36yn3tcnNJXcaInq3zmIRU1rdt4RDne6a1VwuUE`;
      expect(cacheKey).to.equal(expectedKey);
    });

    it ('should throw error', () => {
      
      expect(() => getJWTCacheKey('')).to.throw(`jwt can't be empty`);
    });
  });
  
});