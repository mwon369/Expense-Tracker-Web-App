export const roundToTwoDp = (value: number) => {
  return (Math.round((value + Number.EPSILON) * 100) / 100).toFixed(2);
};
