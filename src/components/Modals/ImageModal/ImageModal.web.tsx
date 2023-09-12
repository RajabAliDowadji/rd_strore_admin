import React from "react";
import { Box, Fade, Modal } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

import "./ImageModal.web.css";

interface imageModalProps {
  open: boolean;
  onClose: any;
  imageSrc: string;
}

const ImageModal = ({ open, onClose, imageSrc }: imageModalProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className="modal"
      open={open}
      onClose={onClose}
      closeAfterTransition
    >
      <Fade in={open} style={{ border: "none" }}>
        <Box className="modalImage_subContainer">
          <CancelIcon className="cancelIcon" onClick={onClose} />
          <img src={imageSrc} className="modalImage" alt="modalImage" />
        </Box>
      </Fade>
    </Modal>
  );
};
export default ImageModal;
