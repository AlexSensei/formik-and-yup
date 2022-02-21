import { ErrorMessage } from "formik";
import styled from "styled-components";
import {
  toCapitalizedWords,
  parseNameToLabel,
} from "../formikGenerator/textTransform";

export const TextFieldInput = ({
  field,
  label,
  placeholder,
  error,
  variant = "outlined",
  ...props
}) => (
  <StyledWrapper>
    <p>{label || toCapitalizedWords(parseNameToLabel(field.name))}</p>
    <TextField
      variant={variant}
      {...props}
      {...field}
      placeholder={placeholder}
      error={
        !!error ||
        (!!props.form.errors[field.name] && !!props.form.touched[field.name])
      }
    />
    <ErrorMessage name={field.name}>
      {(errorMessage) => (
        <StyledErrorMessage>
          {toCapitalizedWords(errorMessage.replace(".", " "))}
        </StyledErrorMessage>
      )}
    </ErrorMessage>
    {!!error && <StyledErrorMessage>{error}</StyledErrorMessage>}
  </StyledWrapper>
);

const TextField = styled.input``;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledErrorMessage = styled.p`
  color: red;
`;
