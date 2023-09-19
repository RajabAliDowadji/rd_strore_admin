import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { GetPlaceResponse } from "../../Modal/GetPlace.modal";
import {
  ADD_PLACE,
  DELETE_PLACE,
  EDIT_PLACE,
  GET_PLACE,
  GET_PLACE_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import CancelButton from "../../Ui/Button/CancelButton.web";
import { pincodeValidate } from "../../Validations/pincodeValidate.web";
import { errorToaster, successToaster } from "../../Utils/common";
import "./Place.web.css";

const configJSON = require("../../Constants/Dashboard");

const TodoPlace = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const initialData = useMemo(() => {
    return {
      pincode: "",
      town: "",
      district: "",
      city: "",
      state: "",
    };
  }, []);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>(initialData);
  const [dataError, setDataError] = useState({
    errors: {
      pincode: false,
    },
    errorMsg: {
      pincode: "",
    },
  });

  useEffect(() => {
    if (
      state &&
      state.add_edit_place &&
      state.add_edit_place.place &&
      state.add_edit_place.place !== null &&
      !state.add_edit_place.isError &&
      state.add_edit_place.message !== ""
    ) {
      successToaster(state.add_edit_place.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "place" },
      });
      navigate("/places");
    }
  }, [dispatch, navigate, state]);

  useEffect(() => {
    if (id) {
      dispatch({
        type: GET_PLACE_BY_ID,
        payload: { id: id },
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (
      state &&
      state.get_place_by_id &&
      state.get_place_by_id.place &&
      state.get_place_by_id.place !== null &&
      id
    ) {
      let temp: GetPlaceResponse = initialData;
      temp.pincode = state.get_place_by_id.place.pincode;
      temp.city = state.get_place_by_id.place.city;
      temp.state = state.get_place_by_id.place.state;
      temp.town = state.get_place_by_id.place.town;
      temp.district = state.get_place_by_id.place.district;
      setFormData((prev: GetPlaceResponse) => ({
        ...prev,
        ...temp,
      }));
    } else if (state.get_place_by_id.isError) {
      errorToaster(state.get_place_by_id.message);
    }
  }, [id, initialData, state]);
  useEffect(() => {
    const route = location.pathname.split("/");
    if (route && route.length > 0) {
      if (route[2] === "create") {
        setIsEdit(false);
      } else {
        setIsEdit(true);
      }
    }
  }, [location]);

  useEffect(() => {
    if (
      state &&
      state.get_place &&
      state.get_place.place &&
      state.get_place.place.length !== 0
    ) {
      let temp: GetPlaceResponse = initialData;
      temp.pincode = state.get_place.place[0].pincode;
      temp.city = state.get_place.place[0].city;
      temp.state = state.get_place.place[0].state;
      temp.town = state.get_place.place[0].village;
      temp.district = state.get_place.place[0].district;
      setFormData((prev: GetPlaceResponse) => ({
        ...prev,
        ...temp,
      }));
    } else if (state.get_place.isError) {
      errorToaster(state.get_place.message);
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
        payload: { state: "place" },
      });
    } else if (state && state.delete_place && state.get_place.isError) {
      errorToaster(state.get_place.message);
    }
  }, [dispatch, initialData, navigate, state]);

  const cancelPlaceHandle = () => {
    navigate("/places");
  };

  const deletePlaceHandle = () => {
    setModalOpen(true);
  };

  const modalHandleClose = () => {
    setModalOpen(false);
  };

  const pincodeChangeHandle = (event: any) => {
    let isValid = pincodeValidate("Pincode", event.target.value);
    let tempFormData: GetPlaceResponse = formData;
    tempFormData.pincode = event.target.value;
    setDataError((prev) => ({
      ...prev,
      errors: { ...dataError.errors, [event.target.name]: isValid.status },
      errorMsg: {
        ...dataError.errorMsg,
        [event.target.name]: isValid.message,
      },
    }));
    if (!isValid.status) {
      tempFormData.pincode = event.target.value;
      dispatch({
        type: GET_PLACE,
        payload: { pincode: event.target.value },
      });
    } else {
      tempFormData.city = "";
      tempFormData.district = "";
      tempFormData.state = "";
      tempFormData.town = "";
    }
    setFormData(tempFormData);
  };

  const formSubmitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isPincodeValid = pincodeValidate("Pincode", formData.pincode);
    if (isPincodeValid.status) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          pincode: isPincodeValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          pincode: isPincodeValid.message,
        },
      }));
    } else {
      if (isEdit) {
        dispatch({
          type: EDIT_PLACE,
          payload: { id: id, values: formData },
        });
      } else {
        dispatch({
          type: ADD_PLACE,
          payload: formData,
        });
      }
    }
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
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Place"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="place_mainContainer">
          <Box className="place_titleContainer">
            <Typography className="place_titleText">
              {isEdit
                ? configJSON.editPlaceBtnTxt
                : configJSON.createPlaceBtnTxt}
            </Typography>
          </Box>
          <form onSubmit={formSubmitHandle}>
            <Box className="place_textFieldContainer">
              <CustomTextField
                id="pincode"
                type="number"
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                error={dataError.errors.pincode}
                errorText={dataError.errorMsg.pincode}
                onChange={pincodeChangeHandle}
              />
            </Box>
            <Box className="place_textFieldContainer">
              <CustomTextField
                id="town"
                type="text"
                label="Town"
                name="town"
                value={formData.town}
                disabled={true}
              />
            </Box>
            <Box className="place_textFieldContainer">
              <CustomTextField
                id="district"
                type="text"
                label="District"
                name="district"
                value={formData.district}
                disabled={true}
              />
            </Box>
            <Box className="place_textFieldContainer">
              <CustomTextField
                id="city"
                type="text"
                label="City"
                name="city"
                value={formData.city}
                disabled={true}
              />
            </Box>
            <Box className="place_textFieldContainer">
              <CustomTextField
                id="state"
                type="text"
                label="State"
                name="state"
                value={formData.state}
                disabled={true}
              />
            </Box>
            <Box className="place_buttonSubContainer">
              {isEdit ? (
                <Box className="place_BtnContainer">
                  <ActiveButton
                    type="submit"
                    title="Update"
                    disabled={false}
                    style={{ width: "205px", margin: "0px 15px 0px 0px" }}
                  />
                  <DeleteButton
                    title="Delete"
                    disabled={false}
                    style={{ width: "205px", margin: "0px 0px 0px 15px" }}
                    onClick={deletePlaceHandle}
                  />
                </Box>
              ) : (
                <Box className="place_BtnContainer">
                  <ActiveButton
                    type="submit"
                    title="Save"
                    disabled={false}
                    style={{ width: "205px", margin: "0px 15px 0px 0px" }}
                  />
                  <CancelButton
                    title="Cancel"
                    disabled={false}
                    style={{ width: "205px", margin: "0px 0px 0px 15px" }}
                    onClick={cancelPlaceHandle}
                  />
                </Box>
              )}
            </Box>
          </form>
        </Box>
      </Dashboard>
    </Box>
  );
};
export default TodoPlace;
