import axios from 'axios';
import _ from 'lodash';
import { RequestHandler } from 'express';

import * as config from '../config/config.json';
import { pickCountryFields } from '../helper/country.helper';
import { getCountryCacheKey } from '../util/cacheKey';
import { getFromCache } from '../manager/cache.manager';

class CountryController {

  getCountries: RequestHandler = async (req, res) => {

    let countryName = req.params.name;

    let base_url = _.get(config, 'service.country.base_url')
    let endpoint = _.get(config, 'service.country.endpoint');
    let url: string = `${base_url}${endpoint}${countryName}`;

    /**
     * Makes the third party call to get the county info and stores the value in cache
     * 
     * If the value is already present in the cache, it will be returned 
     * and the third party call won't be made
     */
    const cacheKey = getCountryCacheKey(countryName);
    let result = await getFromCache(cacheKey, async () => {
      let response;
      try {
        response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.log('No such country found');
        return null;
      }
    });

    const countriesArray: Array<object> = result;

    /**
     * Picking only the necessary fields
     */
    let pickedCountries = pickCountryFields(countriesArray);

    return res.status(200)
      .json(pickedCountries);
  }
}

export default CountryController;