import "./App.css";
import styled from "styled-components";
import FormikGenerator from "./formikGenerator/FormikFormGenerator";
import { TextFieldInput } from "./components/TextFieldInput";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FormikGenerator
          onSubmit={(values) => console.log(values)}
          fields={FIELDS}
          componentMap={{
            string: TextFieldInput,
            number: TextFieldInput,
          }}
          GroupComponent={StyledFieldsGroup}
        />

        <Spacer />

        <FormikGenerator
          onSubmit={(values) => console.log(values)}
          fields={FIELDS_2}
          componentMap={{
            string: TextFieldInput,
            number: TextFieldInput,
          }}
          GroupComponent={StyledFieldsGroup}
          LabelComponent={Label}
        />
      </header>
    </div>
  );
}

const FIELDS = [
  {
    name: "email",
    type: "string",
    conditions: [
      { type: "required" },
      { type: "email", params: ["Please enter a valid email"] },
    ],
    fieldRow: 1,
    inputProps: {
      placeholder: "Email...",
    },
  },
  {
    name: "password",
    type: "string",
    conditions: [
      { type: "required" },
      {
        type: "min",
        params: [10, "Password must be atleast 10 characters long"],
      },
    ],
    fieldRow: 2,
    inputProps: {
      placeholder: "Password",
      type: "password",
    },
  },
];

const FIELDS_2 = [
  {
    name: "firstName",
    type: "string",
    conditions: [{ type: "required" }],
    fieldRow: 1,
    inputProps: {
      placeholder: "John",
    },
  },
  {
    name: "lastName",
    type: "string",
    conditions: [{ type: "required" }],
    fieldRow: 1,
    inputProps: {
      placeholder: "Doe",
    },
  },
  {
    name: "phoneNumber",
    type: "string",
    conditions: [
      { type: "required" },
      {
        type: "matches",
        params: [
          /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
          "Phone number is not valid",
        ],
      },
    ],
    fieldRow: 2,
  },
  {
    name: "address.city",
    type: "string",
    conditions: [{ type: "required" }],
    fieldRow: 3,
    inputProps: {
      placeholder: "City",
    },
  },
  {
    name: "address.street",
    type: "string",
    conditions: [{ type: "required" }],
    fieldRow: 3,
    inputProps: {
      placeholder: "City",
    },
  },
];

const Label = styled.p`
  color: red;
`;

const Spacer = styled.div`
  height: 100px;
`;

const StyledFieldsGroup = styled.div`
  display: flex;
  justify-content: space-between;
  > * {
    width: ${(props) =>
      props.childCount === 1
        ? "100%"
        : `calc(${100 / props.childCount}% - 5px)`};
  }

  width: 30%;
`;

export default App;
