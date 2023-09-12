import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import "./Place.web.css";

const configJSON = require("../../Constants/Dashboard");

const ViewPlace = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const addPlaceHandle = () => {
    navigate("/places/create");
  };
  const editPlaceHandle = () => {
    navigate(`/places/edit/${id}`);
  };
  const deletePlaceHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/places");
    //TODO DELETE PLACE API CALL
  };
  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Place"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="place_mainContainer">
          <Box className="place_buttonContainer">
            <ActiveButton
              title={configJSON.createPlaceBtnTxt}
              disabled={false}
              onClick={addPlaceHandle}
            />
          </Box>
          <Box>
            <Box className="place_textFieldContainer">
              <CustomTextField
                id="_id"
                type="text"
                label="Id"
                name="_id"
                value="64eafd3438f621bdc72a570b"
                disabled={true}
              />
            </Box>
            <Box className="place_textFieldContainer">
              <CustomTextField
                id="town"
                type="text"
                label="Town"
                name="town"
                value="Halvad"
                disabled={true}
              />
            </Box>
            <Box className="place_textFieldContainer">
              <CustomTextField
                id="district"
                type="text"
                label="District"
                name="district"
                value="Halvad"
                disabled={true}
              />
            </Box>

            <Box className="place_textFieldContainer">
              <CustomTextField
                id="city"
                type="text"
                label="City"
                name="city"
                value="SURENDRA NAGAR"
                disabled={true}
              />
            </Box>
            <Box className="place_textFieldContainer">
              <CustomTextField
                id="state"
                type="text"
                label="State"
                name="state"
                value="GUJARAT"
                disabled={true}
              />
            </Box>
            <Box className="place_textFieldContainer">
              <CustomTextField
                id="pincode"
                type="number"
                label="Pincode"
                name="pincode"
                value="363330"
                disabled={true}
              />
            </Box>
          </Box>
          <Box className="place_buttonSubContainer">
            <ActiveButton
              title={configJSON.editBtnTxt}
              disabled={false}
              onClick={editPlaceHandle}
              style={{ width: "205px", margin: "0px 15px 0px 0px" }}
            />
            <DeleteButton
              title={configJSON.deleteBtnTxt}
              disabled={false}
              onClick={deletePlaceHandle}
              style={{ width: "205px", margin: "0px 0px 0px 15px" }}
            />
          </Box>
        </Box>
      </Dashboard>
    </Box>
  );
};
export default ViewPlace;
