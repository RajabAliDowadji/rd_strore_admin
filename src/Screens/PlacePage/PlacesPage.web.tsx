import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Place } from "../../Modal/GetPlaces.modal";
import { useDispatch, useSelector } from "react-redux";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import {
  DELETE_PLACE,
  GET_PLACES,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { errorToaster, successToaster } from "../../Utils/common";
import NoDataFound from "../../Ui/Data/NoDataFound.web";
import DashboardPage from "../DashboardPage/DashboardPage.web";
import "./PlacePage.web.css";

const configJSON = require("../../Constants/Dashboard");

const PlacesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const [placeId, setPlaceId] = useState<string>("");

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
    } else if (
      state &&
      state.get_places &&
      state.get_places.places &&
      state.get_places.places.length === 0
    ) {
      setPlaces([]);
    }
  }, [state, state.get_places]);

  useEffect(() => {
    if (
      state &&
      state.delete_place &&
      !state.delete_place.isError &&
      state.delete_place.message !== ""
    ) {
      successToaster(state.delete_place.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "places" },
      });
    } else if (state && state.delete_place && state.delete_place.isError) {
      errorToaster(state.delete_place.message);
    }
  }, [dispatch, navigate, placeId, places, state]);

  const addPlaceHandle = () => {
    navigate("/places/create");
  };
  const editPlaceHandle = (id: string) => {
    navigate(`/places/edit/${id}`);
  };

  const viewPlaceClickHandle = (id: string) => {
    navigate(`/places/view/${id}`);
  };

  const deleteBtnClickHandle = (id: string) => {
    setPlaceId(id);
    setModalOpen(true);
  };

  const modalHandleClose = () => {
    setModalOpen(false);
  };

  const onDeleteConfirmHandle = () => {
    dispatch({
      type: DELETE_PLACE,
      payload: { id: placeId },
    });
    setModalOpen(false);
  };

  return (
    <Box>
      <DashboardPage>
        <DeleteModal
          open={modalOpen}
          title="Place"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="placepage_buttonContainer">
          <Typography className="placepage_maintitleText">Places</Typography>
          <ActiveButton
            title={configJSON.createPlaceBtnTxt}
            disabled={false}
            onClick={addPlaceHandle}
          />
        </Box>
        {places.length === 0 ? (
          <NoDataFound />
        ) : (
          <DataTable
            rows={places}
            columns={configJSON.placesCoulmns}
            onViewClick={viewPlaceClickHandle}
            onEditClick={editPlaceHandle}
            onDeleteClick={deleteBtnClickHandle}
            isAction={true}
          />
        )}
      </DashboardPage>
    </Box>
  );
};

export default PlacesPage;
