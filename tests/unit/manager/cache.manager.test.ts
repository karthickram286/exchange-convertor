import { describe } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import * as cacheManager from '../../../lib/manager/cache.manager';
import * as redisAccessor from '../../../lib/accessor/redis.accessor';

describe ('Cache Manager', () => {

  before(() => {
    // console.log = () => {};
  });

  afterEach(() => {
    sinon.restore();
  });

  describe ('_getValueFromCache', () => {

    it ('should get value from cache', async () => {
      sinon.stub(redisAccessor, 'getKey').resolves('some val');
      let result = await cacheManager._getValueFromCache('key');
      
      expect(result).to.equals('some val');
    });

    it ('should get json value from cache', async () => {
      sinon.stub(redisAccessor, 'getKey').resolves({ val: 'some val' });
      let result = await cacheManager._getValueFromCache('key');
      
      expect(result).to.be.deep.equals({ val: 'some val' });
    });

    it ('should return null on cache miss', async () => {
      sinon.stub(redisAccessor, 'getKey').resolves();
      let result = await cacheManager._getValueFromCache('key');

      expect(result).to.be.null;
    });

    it ('should return null on error', async () => {
      sinon.stub(redisAccessor, 'getKey').rejects();
      let result = await cacheManager._getValueFromCache('key');

      expect(result).to.be.null;
    });
  });

  describe ('_putValueToCache', () => {

    it ('should put value to cache', async () => {
      sinon.stub(redisAccessor, 'setKeyWithTTL').resolves();
      let result = await cacheManager._putValueToCache('key', 'val');

      expect(result).to.be.undefined;
    });

    it ('should put json value to cache', async () => {
      sinon.stub(redisAccessor, 'setKeyWithTTL').resolves();
      let result = await cacheManager._putValueToCache('key', JSON.stringify({ val: 'some val' }));

      expect(result).to.be.undefined;
    });
  });

  describe ('getFromCache', async () => {

    it ('should return cached value', async () => {
      sinon.stub(redisAccessor, 'getKey').resolves('cached val');
      let result = await cacheManager.getFromCache('cacheKey', () => {});

      expect(result).to.equals('cached val');
    });

    it ('should call the callback function on cache miss', async () => {
      sinon.stub(redisAccessor, 'getKey').resolves(null);
      sinon.stub(redisAccessor, 'setKeyWithTTL').resolves();

      let cbCalled = false;
      await cacheManager.getFromCache('cacheKey', () => {
        cbCalled = true;
      });

      expect(cbCalled).to.be.true;
    });
  });
});