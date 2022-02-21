export const generateInitialValues = (fields) => {
  const initialValues = {};

  fields.forEach((field) => {
    const nameSplit = field.name.split(".");

    if (nameSplit[1]) {
      if (!initialValues[nameSplit[0]]) {
        initialValues[nameSplit[0]] = {};
      }

      initialValues[nameSplit[0]][nameSplit[1]] = field.multiple ? [] : "";
    } else {
      initialValues[field.name] = field.multiple ? [] : "";
    }
  });

  return initialValues;
};
