
export const isEmpty = (value) => {
  return !value?.trim();
};

export const isTooLong = (value, max) => { return value.length > max;}

export const isNull = (value) => {
  return value === null;
};
