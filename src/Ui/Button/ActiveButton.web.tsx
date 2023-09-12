import React from "react";
import { Button } from "@material-ui/core";
import "./Button.web.css";

interface activeButton {
  title: string;
  type?: any;
  onClick?: any;
  style?: any;
  className?: any;
  disabled: boolean;
}

const ActiveButton = ({
  disabled,
  title,
  onClick,
  type,
  style,
  className,
}: activeButton) => {
  return (
    <Button
      type={type}
      style={style}
      className={`${className} activeButton`}
      disabled={disabled}
      disableRipple
      disableFocusRipple
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default ActiveButton;
