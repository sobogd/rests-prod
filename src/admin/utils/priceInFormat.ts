const priceInFormat = (price: string | number | undefined | null) => {
  const number = Number(price) ?? 0;
  return new Intl.NumberFormat("de-DE").format(number);
};

export default priceInFormat;
