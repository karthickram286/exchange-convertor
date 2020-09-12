import _ from 'lodash';

interface currency {
  code: string
}

interface countryInterface {
  name: string,
  population: string,
  flag: string,
  currencies: Array<currency>
}

/**
 * @desc Picks only the needed fields from countries array.
 * 
 * @param countriesArray - Returned from the external api
 * 
 * @returns pickedCountries
 */
const pickCountryFields = (countriesArray: Array<object>) => {

  let pickedCountries = _.map(countriesArray, (country: countryInterface) => {
    let name = country.name;
    let population = country.population;
    let flag = country.flag;
    let code: any = country.currencies[0].code

    return {
      name: name,
      population: population,
      code: code,
      flag: flag
    }
  });
  
  return pickedCountries;
}

export { 
  pickCountryFields
};