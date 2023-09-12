import { capatalizeString } from "../Utils/common";
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";

export const phoneNumberValidate = (fieldName: string, val: string) => {
  if (!val)
    return {
      status: true,
      message: `${capatalizeString(fieldName)} is required.`,
    };
  if (val.length === 0 && val === "") {
    return {
      status: true,
      message: `${capatalizeString(fieldName)} is required.`,
    };
  } else if (!isPossiblePhoneNumber(val) || !isValidPhoneNumber(val)) {
    return {
      status: true,
      message: `Please provide valid ${capatalizeString(fieldName)}.`,
    };
  }
  return { status: false, message: "" };
};
