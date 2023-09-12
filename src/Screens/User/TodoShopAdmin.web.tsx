import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import CancelButton from "../../Ui/Button/CancelButton.web";
import { isEmpty } from "../../Utils/common";
import { emailValidate } from "../../Validations/emailValidate.web";
import PhoneTextField from "../../Ui/CustomTextField/PhoneTextField.web";
import { phoneNumberValidate } from "../../Validations/phoneNumberValidate.web";

import "./Users.web.css";

const configJSON = require("../../Constants/Users");

const TodoShopAdmin = () => {
  const initialData = {
    user_name: "",
    phone_number: "",
    email: "",
    user_type: "Shop_admin",
  };
  const navigate = useNavigate();
  const location = useLocation();
  let { id } = useParams();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialData);
  const [dataError, setDataError] = useState({
    errors: {
      user_name: false,
      phone_number: false,
      email: false,
    },
    errorMsg: {
      user_name: "",
      phone_number: "",
      email: "",
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

  const canceluserHandle = () => {
    navigate("/users");
  };

  const deleteuserHandle = () => {
    setModalOpen(true);
  };

  const modalHandleClose = () => {
    setModalOpen(false);
  };

  const onDeleteConfirmHandle = () => {
    navigate("/users");
    //TODO DELETE SHOP CATEGORY API CALL
  };

  const phoneChangeHandle = (key: string, fieldName: string, value: string) => {
    const isValid = phoneNumberValidate(fieldName, value);
    setFormData((prev) => ({
      ...prev,
      [key]: value ? value : "",
    }));
    setDataError((prev) => ({
      ...prev,
      errors: { ...dataError.errors, [key]: isValid.status },
      errorMsg: {
        ...dataError.errorMsg,
        [key]: isValid.message,
      },
    }));
  };

  const inputChangeHandle = (fieldName: string, event: any) => {
    let isValid = isEmpty(fieldName, event.target.value);
    if (fieldName === "Email") {
      isValid = emailValidate(fieldName, event.target.value);
    }
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
  };

  const formSubmitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isUserNameValid = isEmpty("User name", formData.user_name);
    const isEmailValid = emailValidate("Email", formData.email);
    const isPhoneNoValid = phoneNumberValidate(
      "Phone number",
      formData.phone_number
    );
    if (isEmailValid.status || isUserNameValid.status) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          user_name: isUserNameValid.status,
          email: isEmailValid.status,
          phone_number: isPhoneNoValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          user_name: isUserNameValid.message,
          phone_number: isPhoneNoValid.message,
          email: isEmailValid.message,
        },
      }));
    } else {
      if (isEdit) {
        // TODO UPDATE USER API CALL
        navigate("/users");
      } else {
        // TODO CREATE USER API CALL
        navigate("/users");
      }
    }
  };

  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Shop admin"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="user_mainContainer">
          <Box className="user_titleContainer">
            <Typography className="user_titleText">
              {isEdit
                ? configJSON.shopAdminEditTitleTxt
                : configJSON.shopAdminCreateTitleTxt}
            </Typography>
          </Box>
          <form onSubmit={formSubmitHandle}>
            <Box className="user_textFieldContainer">
              <CustomTextField
                id="user_name"
                type="text"
                label="User name"
                name="user_name"
                value={formData.user_name}
                error={dataError.errors.user_name}
                errorText={dataError.errorMsg.user_name}
                onChange={inputChangeHandle.bind(this, "User name")}
              />
            </Box>
            <Box className="user_textFieldContainer">
              <PhoneTextField
                value={formData.phone_number}
                label="Phone number"
                error={dataError.errors.phone_number}
                errorText={dataError.errorMsg.phone_number}
                onChange={phoneChangeHandle.bind(
                  this,
                  "phone_number",
                  "Phone number"
                )}
              />
            </Box>
            <Box className="user_textFieldContainer">
              <CustomTextField
                id="email"
                type="text"
                label="Email"
                name="email"
                value={formData.email}
                error={dataError.errors.email}
                errorText={dataError.errorMsg.email}
                onChange={inputChangeHandle.bind(this, "Email")}
              />
            </Box>
            <Box className="user_buttonSubContainer">
              {isEdit ? (
                <Box className="user_BtnContainer">
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
                    onClick={deleteuserHandle}
                  />
                </Box>
              ) : (
                <Box className="user_BtnContainer">
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
                    onClick={canceluserHandle}
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
export default TodoShopAdmin;
