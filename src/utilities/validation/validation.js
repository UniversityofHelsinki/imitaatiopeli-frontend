
const validate = async (object, validationFunctions = {}) => {

  const results = { isValid: true };

  for (const [property, validationFn] of Object.entries(validationFunctions)) {
    results[property] = await validationFn(object, property);
    results.isValid &&= results[property].isValid;
  }

  return results;
};

export default validate;