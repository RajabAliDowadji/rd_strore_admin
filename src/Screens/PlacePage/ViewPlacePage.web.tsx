import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { GetPlaceResponse } from "../../Modal/GetPlace.modal";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import DashboardPage from "../DashboardPage/DashboardPage.web";
import {
  DELETE_PLACE,
  GET_PLACE_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import { errorToaster, successToaster } from "../../Utils/common";
import "./PlacePage.web.css";

const configJSON = require("../../Constants/Dashboard");

const ViewPlacePage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);

  const initialData = useMemo(() => {
    return {
      _id: "",
      pincode: "",
      town: "",
      district: "",
      city: "",
      state: "",
    };
  }, []);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>(initialData);

  useEffect(() => {
    dispatch({
      type: GET_PLACE_BY_ID,
      payload: { id: id },
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (
      state &&
      state.get_place_by_id &&
      state.get_place_by_id.place &&
      state.get_place_by_id.place !== null
    ) {
      let temp: GetPlaceResponse = initialData;
      temp._id = state.get_place_by_id.place._id;
      temp.pincode = state.get_place_by_id.place.pincode;
      temp.city = state.get_place_by_id.place.city;
      temp.state = state.get_place_by_id.place.state;
      temp.town = state.get_place_by_id.place.town;
      temp.district = state.get_place_by_id.place.district;
      setFormData((prev: GetPlaceResponse) => ({
        ...prev,
        ...temp,
      }));
    }
  }, [initialData, state]);

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
  }, [dispatch, navigate, state]);
  const addPlaceHandle = () => {
    dispatch({
      type: RESET_STATE,
      payload: { state: "places" },
    });
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
    dispatch({
      type: DELETE_PLACE,
      payload: { id: id },
    });
    navigate("/places");
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
        <Box className="placepage_mainContainer">
          <Box className="placepage_viewbuttonContainer">
            <ActiveButton
              title={configJSON.createPlaceBtnTxt}
              disabled={false}
              onClick={addPlaceHandle}
              style={{ width: "max-content" }}
            />
          </Box>
          <Box>
            <Box className="placepage_textFieldContainer">
              <CustomTextField
                id="_id"
                type="text"
                label="Id"
                name="_id"
                value={formData._id}
                disabled={true}
              />
            </Box>
            <Box className="placepage_textFieldContainer">
              <CustomTextField
                id="town"
                type="text"
                label="Town"
                name="town"
                value={formData.town}
                disabled={true}
              />
            </Box>
            <Box className="placepage_textFieldContainer">
              <CustomTextField
                id="district"
                type="text"
                label="District"
                name="district"
                value={formData.district}
                disabled={true}
              />
            </Box>

            <Box className="placepage_textFieldContainer">
              <CustomTextField
                id="city"
                type="text"
                label="City"
                name="city"
                value={formData.city}
                disabled={true}
              />
            </Box>
            <Box className="placepage_textFieldContainer">
              <CustomTextField
                id="state"
                type="text"
                label="State"
                name="state"
                value={formData.state}
                disabled={true}
              />
            </Box>
            <Box className="placepage_textFieldContainer">
              <CustomTextField
                id="pincode"
                type="number"
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                disabled={true}
              />
            </Box>
          </Box>
          <Box className="placepage_buttonSubContainer">
            <ActiveButton
              title={configJSON.editBtnTxt}
              disabled={false}
              onClick={editPlaceHandle}
              style={{ margin: "0px 15px 0px 0px" }}
            />
            <DeleteButton
              title={configJSON.deleteBtnTxt}
              disabled={false}
              onClick={deletePlaceHandle}
              style={{ margin: "0px 0px 0px 15px" }}
            />
          </Box>
        </Box>
      </DashboardPage>
    </Box>
  );
};
export default ViewPlacePage;
