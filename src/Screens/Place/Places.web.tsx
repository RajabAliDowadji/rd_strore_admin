import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard.web";
import { Box } from "@material-ui/core";
import DataTable from "../../components/DataTable/DataTable.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { useNavigate } from "react-router-dom";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import "./Place.web.css";

const configJSON = require("../../Constants/Dashboard");

const Places = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const rows = [
    {
      _id: "64eafd3438f621bdc72a570b",
      town: "Halvad",
      district: "Halvad",
      city: "SURENDRA NAGAR",
      state: "GUJARAT",
      pincode: 363330,
    },
  ];
  const addPlaceHandle = () => {
    navigate("/places/create");
  };
  const editPlaceHandle = (id: string) => {
    navigate(`/places/edit/${id}`);
  };
  const viewPlaceClickHandle = (id: string) => {
    navigate(`/places/view/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/places");
    setModalOpen(false);
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
          <DataTable
            rows={rows}
            columns={configJSON.placesCoulmns}
            onViewClick={viewPlaceClickHandle}
            onEditClick={editPlaceHandle}
            onDeleteClick={deleteBtnClickHandle}
            isAction={true}
          />
        </Box>
      </Dashboard>
    </Box>
  );
};

export default Places;
