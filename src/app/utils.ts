/**
 * Returns a random integer between the given minimum and maximum values, inclusive.
 * @param {number} min The minimum value.
 * @param {number} max The maximum value.
 * @return {number} A random integer between min and max, inclusive.
 */
const getRandomInteger = (min: number, max: number): number => {
  return min + Math.floor(Math.random() * (max - min + 1));
};
