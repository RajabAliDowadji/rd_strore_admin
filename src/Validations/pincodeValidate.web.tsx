import { capatalizeString } from "../Utils/common";

export const pincodeValidate = (fieldName: string, val: string) => {
  if (
    val.toString().trim().toString().length === 0 &&
    val.toString().trim() === ""
  ) {
    return {
      status: true,
      message: `${capatalizeString(fieldName)} is required.`,
    };
  } else if (
    val.toString().trim().length > 6 ||
    val.toString().trim().length < 6
  ) {
    return {
      status: true,
      message: `Invalid ${capatalizeString(fieldName)}.`,
    };
  }
  return { status: false, message: "" };
};
