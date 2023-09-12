import { capatalizeString } from "../Utils/common";

let emailReg =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailValidate = (fieldName: string, val: string) => {
  if (val.trim().length === 0 && val.trim() === "") {
    return {
      status: true,
      message: `${capatalizeString(fieldName)} is required.`,
    };
  } else if (!emailReg.test(val)) {
    return { status: true, message: `Invalid email address.` };
  }
  return { status: false, message: "" };
};
