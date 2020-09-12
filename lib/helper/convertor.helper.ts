interface ConversionRates {
  [currency: string]: number
}

/**
 * @desc Returns the converted rate for all the countries with respect to the base currency rate.
 * 
 * @param base_currency_rate 
 * @param country_rates 
 * @param amount 
 */
const getConversion = (base_currency_rate: any, country_rates: any, amount: any) => {

  let conversionRates: ConversionRates = {};

  Object.entries(country_rates).forEach(
    ([currency, rate]) => {
      let convertedAmount = (rate as number / base_currency_rate) * amount;
      conversionRates[currency] = convertedAmount;
    }
  );

  return conversionRates;
};

export {
  getConversion
};