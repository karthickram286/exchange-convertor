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

  /**
   * Since the rates are returned with base currency as EUR,
   * we are converting it to the given base_currency_rate
   */
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