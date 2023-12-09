const getPriceWithDiscount = (p: any, q: any, d: any) =>
  Math.round((Number(p) * Number(q) - Number(p) * Number(q) * (d / 100) ?? 0) * 100) / 100;

export const getPositionPriceWithDiscount = (position: any, discount: number) => {
  const price = getPriceWithDiscount(position.p, 1, discount);
  const variantPrice = getPriceWithDiscount(position.v?.p ?? 0, 1, discount);
  const optionsTotal =
    position?.o?.reduce((total: number, po: any) => {
      return total + getPriceWithDiscount(po.p, po.q, discount) ?? 0;
    }, 0) ?? 0;
  return Math.round(Number(optionsTotal + variantPrice + price));
};
