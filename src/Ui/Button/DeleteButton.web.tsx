import React from "react";
import { Button } from "@material-ui/core";
import "./Button.web.css";

interface deleteButton {
  title: string;
  type?: any;
  onClick?: any;
  style?: any;
  disabled: boolean;
}

const DeleteButton = ({
  title,
  onClick,
  disabled,
  type,
  style,
}: deleteButton) => {
  return (
    <Button
      type={type}
      style={style}
      className="deleteButton"
      disabled={disabled}
      disableRipple
      disableFocusRipple
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default DeleteButton;
