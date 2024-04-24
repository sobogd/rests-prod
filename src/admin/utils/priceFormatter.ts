export const priceFormatter = new Intl.NumberFormat("en-US");

export const formatPrice = ({
  price,
  symbol,
}: {
  price?: string | number | null;
  symbol?: string;
}): string => {
  if (!price || !Number(price)) {
    return "0 " + symbol;
  }

  return priceFormatter.format(Number(price)) + " " + symbol;
};
