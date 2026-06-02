export const avg = (arr: number[]) =>
  arr.length ? arr.reduce((acc, curr) => acc + curr, 0) / arr.length : 0;

export const round = (number: number, decimals = 1) => {
  const multiplier = Math.pow(10, decimals);
  return Math.round(number * multiplier) / multiplier;
};
