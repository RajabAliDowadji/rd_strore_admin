import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../Dashboard/Dashboard.web";
import DataTable from "../../components/DataTable/DataTable.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { GET_PLACES } from "../../Hooks/Saga/Constant";
import { Place } from "../../Modal/GetPlaces.modal";
import "./Place.web.css";

const configJSON = require("../../Constants/Dashboard");

const Places = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [places, setPlaces] = useState<Place[]>([]);
  useEffect(() => {
    dispatch({
      type: GET_PLACES,
    });
  }, [dispatch]);
  useEffect(() => {
    if (
      state &&
      state.get_places &&
      state.get_places.places &&
      state.get_places.places.length !== 0
    ) {
      let tempArr: Place[] = [];
      state.get_places.places.map((place: Place) =>
        tempArr.push({
          _id: place._id,
          town: place.town,
          district: place.district,
          city: place.city,
          state: place.state,
          pincode: place.pincode,
        })
      );
      setPlaces(tempArr);
    }
  }, [state]);
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
            rows={places}
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
