import { Formik, Field } from "formik";
import { generateInitialValues } from "./generateInitialValues";
import { generateValidationSchema } from "./generateValidationSchema";
import { parseOptions } from "./parseOptions";
import { toCapitalizedWords } from "./textTransform";

const generateSectionName = ({ name }) => {
  const splitedName = name.split(".");

  if (splitedName[1]) {
    return toCapitalizedWords(splitedName[0]);
  }

  return null;
};

const generateRulesForField = (field, componentMap) => ({
  name: field.name,
  component: componentMap[field.type],
  options: parseOptions(field.options, !!field.optionsParsed),
  multiple: !!field.multiple,
  ...field.inputProps,
});

const FormikGenerator = ({
  onSubmit,
  fields,
  submitButtonLabel = "Create",
  initialData = {},
  componentMap,
  GroupComponent,
  LabelComponent,
}) => {
  const groupedFieldsByRowfields = fields.reduce((curr, acc) => {
    if (curr[acc.fieldRow]) {
      curr[acc.fieldRow].push(acc);
    } else {
      curr[acc.fieldRow] = [acc];
    }

    return curr;
  }, {});

  const renderLabel = (key) => {
    const label = generateSectionName(key);
    if (label) {
      return <LabelComponent>{label}</LabelComponent>;
    }

    return <></>;
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        ...generateInitialValues(fields),
        ...initialData,
      }}
      enableReinitialize
      validationSchema={generateValidationSchema(fields)}
    >
      {({ submitForm }) => (
        <>
          {Object.keys(groupedFieldsByRowfields).map((key) => [
            renderLabel(groupedFieldsByRowfields[key][0]),
            <GroupComponent
              childCount={groupedFieldsByRowfields[key].length}
              key={key}
            >
              {groupedFieldsByRowfields[key].map((field, index) => (
                <Field
                  {...generateRulesForField(field, componentMap)}
                  key={index}
                />
              ))}
            </GroupComponent>,
          ])}
          <button onClick={submitForm}>{submitButtonLabel}</button>
        </>
      )}
    </Formik>
  );
};

export default FormikGenerator;
