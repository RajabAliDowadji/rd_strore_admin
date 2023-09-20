import React from "react";
import { Box, Typography } from "@material-ui/core";
import Select from "react-dropdown-select";
import { Colors } from "../../Constants/Colors";

import "./DropDown.web.css";

interface dropDownProps {
  label: string;
  name: string;
  required: boolean;
  multi: boolean;
  data: any;
  values: any;
  disabled: boolean;
  clearable: boolean;
  placeholder: string;
  error?: boolean;
  errorText?: string;
  labelField?: string;
  valueField?: string;
  onChange: any;
}
const DropDown = ({
  label,
  name,
  required,
  multi,
  data,
  values,
  disabled,
  clearable,
  placeholder,
  error,
  errorText,
  labelField,
  valueField,
  onChange,
}: dropDownProps) => {
  return (
    <Box>
      <Typography className="label">{label}</Typography>
      <Select
        multi={multi}
        name={name}
        required={required}
        options={data}
        disabled={disabled}
        clearable={clearable}
        values={data.filter((data: any) => values.includes(data._id))}
        onChange={onChange}
        color={Colors.primary500}
        placeholder={placeholder}
        labelField={labelField}
        valueField={valueField}
        className={`dropDown ${error && `error`} `}
      />
      {error && <Typography className="errorText">{errorText}</Typography>}
    </Box>
  );
};
export default DropDown;
