import { capatalizeString } from "../Utils/common";

export const dropDownValidate = (fieldName: string, values: any) => {
  if (values.length === 0) {
    return {
      status: true,
      message: `Please select ${capatalizeString(fieldName)}.`,
    };
  } else {
    return {
      status: false,
      message: "",
      value: values[0].value,
    };
  }
};
