import React from "react";
import { Box, Fade, Modal, Typography } from "@material-ui/core";
import ActiveButton from "../../../Ui/Button/ActiveButton.web";
import CancelButton from "../../../Ui/Button/CancelButton.web";

import "./DeleteModal.web.css";

const configJSON = require("../../../Constants/Modal");

interface deleteModalProps {
  open: boolean;
  title: string;
  onClose: any;
  onConfirmClick: any;
}

const DeleteModal = ({
  open,
  title,
  onClose,
  onConfirmClick,
}: deleteModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      disableAutoFocus={true}
      className="delete_modalContainer"
    >
      <Fade in={open}>
        <Box className="delete_modalSubContainer">
          <Typography className="delete_modalTitleText">{title}</Typography>
          <Box className="delete_modalBorder"></Box>
          <Typography className="delete_modalSubTitleText">
            {configJSON.deleteModalText}
          </Typography>
          <Box className="delete_btnContainer">
            <CancelButton
              title="Cancel"
              disabled={false}
              style={{ width: "205px", margin: "0px 10px 0px 0px" }}
              onClick={onClose}
            />
            <ActiveButton
              title="Yes"
              disabled={false}
              style={{ width: "205px", margin: "0px 0px 0px 10px" }}
              onClick={onConfirmClick}
            />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
export default DeleteModal;
