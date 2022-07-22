export default function random(a, b, rng = fxrand, decimalPlaces = 16) {
  const hasA = typeof a !== 'undefined';
  const hasB = typeof b !== 'undefined';

  let min = 0;
  let max = 1;

  if (hasA && hasB) {
    min = a;
    max = b;
  } else if (hasA) {
    min = 0;
    max = a;
  }

  const value = (rng || fxrand)() * (max - min) + min;

  if (decimalPlaces) {
    return parseFloat(value.toFixed(decimalPlaces));
  }

  return Math.round(value);
}
