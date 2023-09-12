import React from "react";
import { TextField, Typography } from "@material-ui/core";
import "./CustomTextField.web.css";

interface customTextField {
  id: string;
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  error?: boolean;
  errorText?: string;
  multiline?: boolean;
  maxRows?: number;
  minRows?: number;
  onChange?: any;
  defaultvalue?: string;
  disabled?: boolean;
}

const CustomTextField = ({
  id,
  type,
  label,
  name,
  placeholder,
  value,
  error,
  errorText,
  defaultvalue,
  multiline,
  maxRows,
  minRows,
  onChange,
  disabled,
}: customTextField) => {
  return (
    <>
      <Typography className="label">{label}</Typography>
      <TextField
        variant="outlined"
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className="textField"
        value={value}
        error={error}
        onChange={onChange}
        defaultValue={defaultvalue}
        disabled={disabled}
        multiline={multiline}
        maxRows={maxRows}
        minRows={minRows}
        inputProps={{
          className: "textField_InputProps",
        }}
        InputProps={{
          className: multiline
            ? disabled
              ? "textArea_DisabledInput"
              : "textArea_Input"
            : disabled
            ? "textField_DisabledInput"
            : "textField_Input",
        }}
      />
      {error && <Typography className="errorText">{errorText}</Typography>}
    </>
  );
};
export default CustomTextField;
