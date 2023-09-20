export const format = (number: number | string) =>
  Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    notation: 'compact',
    minimumFractionDigits: 2,
  }).format(parseFloat(number.toString()));
