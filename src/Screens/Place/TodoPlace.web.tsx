import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import CancelButton from "../../Ui/Button/CancelButton.web";
import { pincodeValidate } from "../../Validations/pincodeValidate.web";
import "./Place.web.css";

const configJSON = require("../../Constants/Dashboard");

const TodoPlace = () => {
  const initialData = {
    pincode: "",
    town: "",
    district: "",
    city: "",
    state: "",
  };
  const navigate = useNavigate();
  const location = useLocation();
  let { id } = useParams();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialData);
  const [dataError, setDataError] = useState({
    errors: {
      pincode: false,
    },
    errorMsg: {
      pincode: "",
    },
  });
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
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setDataError((prev) => ({
      ...prev,
      errors: { ...dataError.errors, [event.target.name]: isValid.status },
      errorMsg: {
        ...dataError.errorMsg,
        [event.target.name]: isValid.message,
      },
    }));
    if (!isValid) {
      //TODO API CALL FOR PINCODE DATA AND RESPONSE SET INTO FORM DATA
    }
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
        // TODO UPDATE PLACE API CALL
        navigate("/places");
      } else {
        // TODO CREATE PLACE API CALL
        navigate("/places");
      }
    }
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
