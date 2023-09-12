import { capatalizeString } from "../Utils/common";

const passwordReg =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,16}$/;

export const passwordValidate = (fieldName: string, password: string = "") => {
  if (password === "" || password === undefined || password === null) {
    return {
      status: true,
      message: `${capatalizeString(fieldName)} is required.`,
    };
  } else if (!passwordReg.test(password)) {
    return {
      status: true,
      message: `The ${capatalizeString(
        fieldName
      )} should contain atleast 8 letters, one uppercase, one lowercase and one special character.`,
    };
  }

  return { status: false, message: "" };
};
