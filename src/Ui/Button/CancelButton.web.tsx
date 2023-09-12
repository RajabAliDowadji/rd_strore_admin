import React from "react";
import { Button } from "@material-ui/core";
import "./Button.web.css";

interface cancelButton {
  title: string;
  type?: any;
  onClick?: any;
  style?: any;
  disabled: boolean;
}

const CancelButton = ({
  disabled,
  title,
  onClick,
  type,
  style,
}: cancelButton) => {
  return (
    <Button
      type={type}
      style={style}
      className="cancelButton"
      disabled={disabled}
      disableRipple
      disableFocusRipple
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default CancelButton;
