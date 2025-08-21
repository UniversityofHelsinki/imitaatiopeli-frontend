
const validate = async (object, validationFunctions = {}, t) => {

  const results = { isValid: true };

  for (const [property, validationFn] of Object.entries(validationFunctions)) {
    results[property] = await validationFn(object, property, t);
    results.isValid &&= results[property].isValid;
  }

  return results;
};

export default validate;