import React from "react";
import { Box, Button } from "@material-ui/core";
import "./ButtonGroup.web.css";

interface buttonGroupProps {
  id: string;
  onViewClick: any;
  onEditClick: any;
  onDeleteClick: any;
}

const ButtonGroup = ({
  id,
  onViewClick,
  onEditClick,
  onDeleteClick,
}: buttonGroupProps) => {
  return (
    <Box className="buttonConainer">
      <Box className="buttonInnerConainer">
        <Button
          className="buttonGroup_activeButton"
          disableRipple
          disableFocusRipple
          onClick={onViewClick.bind(this, id)}
        >
          View
        </Button>
      </Box>
      <Box className="buttonInnerConainer">
        <Button
          className="buttonGroup_activeButton"
          disableRipple
          disableFocusRipple
          onClick={onEditClick.bind(this, id)}
        >
          Edit
        </Button>
      </Box>
      <Box className="buttonInnerConainer">
        <Button
          className="buttonGroup_deleteButton"
          disableRipple
          disableFocusRipple
          onClick={onDeleteClick.bind(this, id)}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default ButtonGroup;
