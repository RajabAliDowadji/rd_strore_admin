import toast from "react-hot-toast";
import { Typography } from "@material-ui/core";
import "./common.css";

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

export const isNumEmpty = (fieldName: string, val: number) => {
  if (val < 0 || val === 0) {
    return {
      status: true,
      message: `${capatalizeString(fieldName)} is required.`,
    };
  } else {
    return { status: false, message: "" };
  }
};
export const isImageUpload = (fieldName: string, val: string | []) => {
  if (typeof val === "string") {
    if (val && val.trim() === "") {
      return {
        status: true,
        message: `Please upload ${capatalizeString(fieldName)}.`,
      };
    } else {
      return {
        status: false,
        message: "",
      };
    }
  } else {
    return {
      status: true,
      message: `Please click on upload.`,
    };
  }
};

export const successToaster = (message: string) => {
  if (message) {
    return toast.success(
      <Typography className="toasterText">{message}</Typography>,
      {
        duration: 3000,
      }
    );
  }
};
export const errorToaster = (message: string) => {
  if (message) {
    return toast.error(
      <Typography className="toasterText">{message}</Typography>,
      {
        duration: 3000,
      }
    );
  }
};
