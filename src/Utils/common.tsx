export const capatalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isEmpty = (fieldName: string, val: string) => {
  if (val.trim().length === 0 && val.trim() === "") {
    return {
      status: true,
      message: `${capatalizeString(fieldName)} is required.`,
    };
  } else {
    return { status: false, message: "" };
  }
};
export const isImageUpload = (fieldName: string, val: string) => {
  if (val.trim().length === 0 && val.trim() === "") {
    return {
      status: true,
      message: `Please upload ${capatalizeString(fieldName)}.`,
    };
  } else {
    return { status: false, message: "" };
  }
};
