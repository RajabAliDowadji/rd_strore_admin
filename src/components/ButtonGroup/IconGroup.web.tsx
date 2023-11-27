import React from "react";
import { Box } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "./ButtonGroup.web.css";

interface buttonGroupProps {
  id: string;
  onViewClick: any;
  onEditClick: any;
  onDeleteClick: any;
}

const IconGroup = ({
  id,
  onViewClick,
  onEditClick,
  onDeleteClick,
}: buttonGroupProps) => {
  return (
    <Box className="buttonConainer">
      <Box className="buttonInnerConainer">
        <VisibilityIcon
          className="buttonGroup_activeIcon"
          onClick={onViewClick.bind(this, id)}
        />
      </Box>
      <Box className="buttonInnerConainer">
        <EditIcon
          className="buttonGroup_activeIcon"
          onClick={onEditClick.bind(this, id)}
        />
      </Box>
      <Box className="buttonInnerConainer">
        <DeleteForeverIcon
          className="buttonGroup_deleteIcon"
          onClick={onDeleteClick.bind(this, id)}
        />
      </Box>
    </Box>
  );
};

export default IconGroup;
