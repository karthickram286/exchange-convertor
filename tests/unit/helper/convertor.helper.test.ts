import { describe } from 'mocha';
import { expect } from 'chai';

import { getConversion } from '../../../lib/helper/convertor.helper';

describe ('Convertor Helper', () => {

  describe ('getConversion', () => {

    it ('should return converted currency rates', () => {
      let baseCurrencyRate = 10.382492;
      let countryRates = {
        GBP: 0.925948,
        INR: 87.051291,
        JPY: 125.767187,
        RUB: 88.7319,
        USD: 1.18475
      };
      let amount = 25;

      let expectedResult = {
        GBP: 2.229589967418227,
        INR: 209.61078274849626,
        JPY: 302.83477945371885,
        RUB: 213.6575207570591,
        USD: 2.852759241230333
      };

      let result = getConversion(baseCurrencyRate, countryRates, amount);
      expect(result).to.be.deep.equals(expectedResult);
    });
  });
});