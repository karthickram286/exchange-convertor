import axios from 'axios';
import _ from 'lodash';
import { RequestHandler } from 'express';

import * as config from '../config/config.json';
import { getConvertorCacheKey } from '../util/cacheKey';
import { getFromCache } from '../manager/cache.manager';
import { getConversion } from '../helper/convertor.helper';

class ConvertorController {

  convertToBaseCurrency: RequestHandler = async (req, res) => {

    let { base_currency, currency_list, amount } = req.body;

    currency_list.push(base_currency);
    let currencies = this._getCSVCountries(currency_list);

    let base_url = _.get(config, 'service.convertor.base_url');
    let access_key_param = _.get(config, 'service.convertor.access_key_param');
    let access_key = _.get(config, 'service.convertor.access_key');
    let convertor_param = _.get(config, 'service.convertor.convertor_param');
    let url = `${base_url}${access_key_param}${access_key}${convertor_param}${currencies}`;

    /**
     * Makes the third party call to get the rates and stores the value in cache
     * 
     * If the value is already present in the cache, it will be returned 
     * and the third party call won't be made
     */
    const cacheKey = getConvertorCacheKey(currencies);
    let result = await getFromCache(cacheKey, async () => {
      let response = await axios.post(url);
      return response.data;
    });

    let rates = result.rates;
    let base_currency_rate = rates[base_currency];
    delete rates[base_currency];

    /**
     * Getting the conversion amounts
     */
    let conversionAmount = getConversion(base_currency_rate, rates, amount);

    return res.status(200)
      .json(conversionAmount);
  }

  _getCSVCountries = (currency_list: any) => {
    return currency_list.sort().join(',');
  };
}

export default ConvertorController;