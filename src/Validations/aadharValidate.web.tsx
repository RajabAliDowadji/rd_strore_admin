import { capatalizeString } from "../Utils/common";

export const aadharValidate = (fieldName: string, val: string) => {
  if (val.trim().length === 0 && val.trim() === "") {
    return {
      status: true,
      message: `${capatalizeString(fieldName)} is required.`,
    };
  } else if (val.trim().length > 12 || val.trim().length < 12) {
    return {
      status: true,
      message: `Invalid ${capatalizeString(fieldName)}.`,
    };
  }
  return { status: false, message: "" };
};
