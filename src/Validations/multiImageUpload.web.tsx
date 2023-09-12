import { capatalizeString } from "../Utils/common";

export const multiImageUploadValidate = (fieldName: string, values: any) => {
  if (values.map((value: any) => value.imageURL !== "")) {
    return {
      status: true,
      message: `Please select ${capatalizeString(fieldName)}.`,
    };
  } else {
    return {
      status: false,
      message: "",
    };
  }
};
