const getRandomInteger = (minimum: number, maximum: number): number => {
  return minimum + Math.floor(Math.random() * (maximum - minimum + 1));
};
