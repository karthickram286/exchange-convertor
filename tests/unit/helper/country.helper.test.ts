import { describe } from 'mocha';
import { expect } from 'chai';

import { pickCountryFields } from '../../../lib/helper/country.helper';
import * as testData from './country.helper-data.json';

describe ('Country Helper', () => {

  describe ('pickCountryField', () => {

    it ('should return picked country fields', () => {
      let result = pickCountryFields(testData.request.pickCountryFields);
      let expectedResult = testData.response.pickCountryFields;
      
      expect(result).to.be.deep.equals(expectedResult);
    });
  });
});