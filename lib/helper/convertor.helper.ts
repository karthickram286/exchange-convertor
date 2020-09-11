interface ConversionRates {
  [currency: string]: number
}

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