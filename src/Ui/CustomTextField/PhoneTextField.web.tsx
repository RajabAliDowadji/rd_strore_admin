import React from "react";
import { Typography } from "@material-ui/core";
import Input from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import "./CustomTextField.web.css";

interface customTextField {
  label: string;
  placeholder?: string;
  value: string;
  error?: boolean;
  errorText?: string;
  onChange?: any;
}
const PhoneTextField = ({
  label,
  placeholder,
  value,
  error,
  errorText,
  onChange,
}: customTextField) => {
  return (
    <>
      <Typography className="label">{label}</Typography>
      <Input
        country="IN"
        value={value}
        onChange={onChange}
        className={
          error ? `phoneField_ErrotInputProps` : `phoneField_InputProps`
        }
      />
      {error && <Typography className="errorText">{errorText}</Typography>}
    </>
  );
};
export default PhoneTextField;
