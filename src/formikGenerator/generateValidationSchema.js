import * as yup from "yup";

export const generateValidationSchema = (fields) => {
  try {
    const preparedSchema = fields.reduce((acc, curr) => {
      const splitedName = curr.name.split(".");

      if (!splitedName[1]) {
        return { ...acc, [curr.name]: curr };
      }

      return {
        ...acc,
        [splitedName[0]]: [
          ...(acc[splitedName[0]] ?? []),
          { ...curr, name: splitedName[1] ?? splitedName[0] },
        ],
      };
    }, {});

    const schema = Object.keys(preparedSchema)
      .map((key) =>
        preparedSchema[key].length > 1
          ? {
              name: key,
              type: "object",
              fields: preparedSchema[key],
            }
          : preparedSchema[key]
      )
      .reduce(createYupSchema, {});

    return yup.object().shape(schema);
  } catch (e) {
    return yup.object().shape({});
  }
};

const createYupSchema = (schema, config) => {
  const { name, conditions = [], multiple, fields = [] } = config;
  let { type } = config;

  if (type === "object") {
    const objSchema = fields.reduce(createYupSchema, {});

    schema[name] = yup.object().shape(objSchema);

    return schema;
  }

  if (type === "select" || multiple) {
    type = multiple ? "array" : "string";
  }

  if (!yup[type]) {
    return schema;
  }

  const validatorFunction = yup[type];
  let validator = validatorFunction();

  conditions.forEach((validation) => {
    const { params, type } = validation;

    if (!validator[type]) {
      return;
    }

    if (params) {
      validator = validator[type](...params);
    } else {
      validator = validator[type]();
    }
  });

  schema[name] = validator;

  return schema;
};
