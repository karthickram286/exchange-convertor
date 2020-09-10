import axios from 'axios';
import _ from 'lodash';
import { RequestHandler } from 'express';

import * as config from '../config/config.json';
import { getFromCache } from '../manager/cache.manager';

class ConvertorController {

  convertToBaseCurrency: RequestHandler = async (req, res) => {

    let { listOfCurrencies } = req.body;

    let base_url = _.get(config, 'service.convertor.base_url');
    let access_key_param = _.get(config, 'service.convertor.access_key_param');
    let access_key = _.get(config, 'service.convertor.access_key');
    let convertor_param = _.get(config, 'service.convertor.convertor_param');
    let url = `${base_url}${access_key_param}${access_key}${convertor_param}${listOfCurrencies}`;

    console.log(url);
    const cacheKey = 'test';
    let result = await getFromCache(cacheKey, async () => {
      let response = await axios.post(url);
      return response.data;
    });

    return res.status(200)
      .json(result);
  }
}

export default ConvertorController;