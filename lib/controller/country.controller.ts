import axios from 'axios';
import _ from 'lodash';
import { RequestHandler } from 'express';

import * as config from '../config/config.json';
import { pickCountryField } from '../helper/country.helper';

class CountryController {

  getCountries: RequestHandler = async (req, res) => {

    let countryName = req.params.name;

    let url: string = _.get(config, 'service.country.endpoint') + countryName;

    const response = await axios.get(url);
    const countriesArray: Array<object> = response.data;

    let pickedCountries = pickCountryField(countriesArray);

    return res.status(200)
      .json(pickedCountries);
  }
}

export default CountryController;