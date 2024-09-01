const formatMoney = (amount: number, currency = 'USD', locale = 'en-US') => {
  const options = {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  };

  if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat(locale, options);
  return formatter.format(amount / 100);
}

export default formatMoney