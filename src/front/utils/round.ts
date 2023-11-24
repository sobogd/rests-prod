export const roundOrNull = (
  number: string | number | null = 0,
  umnoz: number = 1,
  kratn: number = 5
): number => {
  if (!number) {
    return 0;
  }
  const n = Math.round(umnoz ? Number(number) * umnoz : Number(number));
  const b = n % kratn;

  return b ? n - b + kratn : n;
};
