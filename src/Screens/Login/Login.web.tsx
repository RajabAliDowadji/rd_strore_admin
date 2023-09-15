import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { emailValidate } from "../../Validations/emailValidate.web";
import { passwordValidate } from "../../Validations/passwordValidate.web";
import { isEmpty } from "../../Utils/common";
import { front_loginImg } from "./assets";
import "./Login.web.css";
import { USER_LOGIN } from "../../Hooks/Saga/Constant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const configJSON = require("../../Constants/Users");

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [dataError, setDataError] = useState({
    errors: {
      email: false,
      password: false,
    },
    errorMsg: {
      email: "",
      password: "",
    },
  });
  const state = useSelector((state: any) => state);

  useEffect(() => {
    if (state && state.login_user && state.login_user.isLoginSuccess) {
      localStorage.setItem(
        "user_data",
        JSON.stringify(state.login_user.userLoginResponse.data)
      );
      localStorage.setItem(
        "token",
        state.login_user.userLoginResponse.data.token
      );
      navigate("/dashboard");
    }
  }, [state, navigate]);
  const inputChangeHandle = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let isValid = isEmpty(fieldName, event.target.value);
    if (fieldName === "Email") {
      isValid = emailValidate(fieldName, event.target.value);
    }
    if (fieldName === "Password") {
      isValid = passwordValidate(fieldName, event.target.value);
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
    const isEmailValid = emailValidate("Email", formData.email);
    const isPasswordValid = passwordValidate("Password", formData.password);
    if (isEmailValid.status || isPasswordValid.status) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          email: isEmailValid.status,
          password: isPasswordValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          email: isEmailValid.message,
          password: isPasswordValid.message,
        },
      }));
    } else {
      dispatch({
        type: USER_LOGIN,
        payload: formData,
      });
    }
  };
  return (
    <Box className="login_mainContainer">
      <Grid container className="login_GridContainer">
        <Grid item xs={12} md={6} lg={6}>
          <Box className="login_imgContainer">
            <Box className="login_imgSubContainer">
              <img
                src={front_loginImg}
                alt="login_image"
                className="login_img"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={10} md={6} lg={6} className="login_subGridContainer">
          <Box className="login_formContainer">
            <Box className="login_SubContainer">
              <form onSubmit={formSubmitHandle}>
                <Typography className="login_titleText">
                  {configJSON.loginTxt}
                </Typography>
                <Box className="login_fieldContainer">
                  <CustomTextField
                    id="emailId"
                    type="text"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    value={formData.email}
                    error={dataError.errors.email}
                    errorText={dataError.errorMsg.email}
                    onChange={inputChangeHandle.bind(this, "Email")}
                  />
                </Box>
                <Box className="login_fieldContainer">
                  <CustomTextField
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    label="Password"
                    value={formData.password}
                    error={dataError.errors.password}
                    errorText={dataError.errorMsg.password}
                    onChange={inputChangeHandle.bind(this, "Password")}
                  />
                </Box>
                <Box className="login_BtnContainer">
                  <ActiveButton
                    title="Login"
                    type="submit"
                    disabled={false}
                    className="login_Btn"
                  />
                </Box>
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
