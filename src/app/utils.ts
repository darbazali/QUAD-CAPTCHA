/**
 * Returns a random integer between the given minimum and maximum values, inclusive.
 * @param {number} min The minimum value.
 * @param {number} max The maximum value.
 * @return {number} A random integer between min and max, inclusive.
 * @throws {ReferenceError} If 'Math' is not defined.
 */
const getRandomInteger = (min: number, max: number): number => {
  if (typeof Math === "undefined") {
    throw new ReferenceError("Math is not defined");
  }

  if (min > max) {
    throw new Error("min cannot be greater than max");
  }

  return min + Math.floor(Math.random() * (max - min + 1));
};
