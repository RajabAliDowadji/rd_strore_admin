import React, { useEffect, useMemo, useState } from "react";
import { Box, Divider, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import CancelButton from "../../Ui/Button/CancelButton.web";
import {
  errorToaster,
  isEmpty,
  isImageUpload,
  successToaster,
} from "../../Utils/common";
import { emailValidate } from "../../Validations/emailValidate.web";
import DropDown from "../../Ui/DropDown/DropDown.web";
import { dropDownValidate } from "../../Validations/dropDownValidate.web";
import ImageUpload from "../../Ui/Image/ImageUpload.web";
import PhoneTextField from "../../Ui/CustomTextField/PhoneTextField.web";
import { phoneNumberValidate } from "../../Validations/phoneNumberValidate.web";
import { aadharValidate } from "../../Validations/aadharValidate.web";
import { ShopCategory } from "../../Modal/GetShopCategories.modal";
import { Place } from "../../Modal/GetPlaces.modal";
import {
  profile_placeHolder,
  shop_placeHolder,
  card_placeHolder,
} from "./assets";
import {
  ADD_FILE,
  ADD_SHOP,
  DELETE_FILE,
  DELETE_SHOP,
  EDIT_SHOP,
  GET_PLACES,
  GET_SHOP_BY_ID,
  GET_SHOP_CATEGORIES,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import "./Shops.web.css";
import { GetShopByIdResponse } from "../../Modal/GetShopById.modal";

const configJSON = require("../../Constants/Shop");

const TodoShop = () => {
  const initialData = useMemo(() => {
    return {
      shop_name: "",
      owner_name: "",
      email: "",
      phone_number: "",
      optional_number: "",
      aadhar_number: "",
      second_owner_name: "",
      second_owner_number: "",
      owner_image: "",
      owner_aadhar_card: "",
      shop_image: "",
      address: "",
      place: "",
      shop_category: "",
    };
  }, []);

  const initialFileData = useMemo(() => {
    return {
      owner_image: {
        file_url: "",
      },
      shop_image: {
        file_url: "",
      },
      owner_aadhar_card: {
        file_url: "",
      },
    };
  }, []);

  let { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>(initialData);
  const [fileData, setFileData] = useState<any>(initialFileData);
  const [shopCategories, setShopCategories] = useState<ShopCategory[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [key, setKey] = useState("");
  const [dataError, setDataError] = useState({
    errors: {
      shop_name: false,
      owner_name: false,
      email: false,
      phone_number: false,
      aadhar_number: false,
      owner_image: false,
      owner_aadhar_card: false,
      shop_image: false,
      address: false,
      place: false,
      shop_category: false,
    },
    errorMsg: {
      shop_name: "",
      owner_name: "",
      email: "",
      phone_number: "",
      aadhar_number: "",
      owner_image: "",
      owner_aadhar_card: "",
      shop_image: "",
      address: "",
      place: "",
      shop_category: "",
    },
  });

  useEffect(() => {
    if (id) {
      dispatch({
        type: GET_SHOP_BY_ID,
        payload: { id: id },
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch({
      type: GET_SHOP_CATEGORIES,
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: GET_PLACES,
    });
  }, [dispatch]);

  useEffect(() => {
    if (
      state &&
      state.get_shop_by_id &&
      state.get_shop_by_id.shop &&
      state.get_shop_by_id.shop !== null
    ) {
      let temp: GetShopByIdResponse = {
        shop_name: "",
        owner_name: "",
        email: "",
        phone_number: "",
        optional_number: "",
        aadhar_number: "",
        second_owner_name: "",
        second_owner_number: "",
        owner_image: "",
        owner_aadhar_card: "",
        shop_image: "",
        address: "",
        place: "",
        shop_category: "",
      };
      let tempFile: any = {
        owner_image: {
          file_url: "",
        },
        shop_image: {
          file_url: "",
        },
        owner_aadhar_card: {
          file_url: "",
        },
      };
      temp._id = state.get_shop_by_id.shop._id;
      temp.shop_name = state.get_shop_by_id.shop.shop_name;
      temp.owner_name = state.get_shop_by_id.shop.owner_name;
      temp.email = state.get_shop_by_id.shop.email;
      temp.phone_number = state.get_shop_by_id.shop.phone_number;
      temp.optional_number = state.get_shop_by_id.shop.optional_number;
      temp.aadhar_number = state.get_shop_by_id.shop.aadhar_number;
      temp.second_owner_name = state.get_shop_by_id.shop.second_owner_name;
      temp.second_owner_number = state.get_shop_by_id.shop.second_owner_number;
      temp.owner_image =
        state.get_shop_by_id.shop.owner_image &&
        state.get_shop_by_id.shop.owner_image !== null &&
        state.get_shop_by_id.shop.owner_image._id
          ? state.get_shop_by_id.shop.owner_image._id
          : "";
      temp.owner_aadhar_card =
        state.get_shop_by_id.shop.owner_aadhar_card &&
        state.get_shop_by_id.shop.owner_aadhar_card !== null &&
        state.get_shop_by_id.shop.owner_aadhar_card._id
          ? state.get_shop_by_id.shop.owner_aadhar_card._id
          : "";
      temp.shop_image =
        state.get_shop_by_id.shop.shop_image &&
        state.get_shop_by_id.shop.shop_image !== null &&
        state.get_shop_by_id.shop.shop_image._id
          ? state.get_shop_by_id.shop.shop_image._id
          : "";
      temp.address = state.get_shop_by_id.shop.address;
      temp.place = state.get_shop_by_id.shop.place._id;
      temp.shop_category = state.get_shop_by_id.shop.shop_category._id;

      tempFile.owner_image =
        state.get_shop_by_id.shop.owner_image &&
        state.get_shop_by_id.shop.owner_image !== null &&
        state.get_shop_by_id.shop.owner_image
          ? state.get_shop_by_id.shop.owner_image
          : tempFile.owner_image;

      tempFile.owner_aadhar_card =
        state.get_shop_by_id.shop.owner_aadhar_card &&
        state.get_shop_by_id.shop.owner_aadhar_card !== null &&
        state.get_shop_by_id.shop.owner_aadhar_card
          ? state.get_shop_by_id.shop.owner_aadhar_card
          : tempFile.owner_aadhar_card;

      tempFile.shop_image =
        state.get_shop_by_id.shop.shop_image &&
        state.get_shop_by_id.shop.shop_image !== null &&
        state.get_shop_by_id.shop.shop_image
          ? state.get_shop_by_id.shop.shop_image
          : tempFile.shop_image;
      if (key === "") {
        setFileData((prev: string[]) => ({
          ...prev,
          ...tempFile,
        }));

        setFormData((prev: GetShopByIdResponse) => ({
          ...prev,
          ...temp,
        }));
      }
    } else if (state.get_shop_category_by_id.isError) {
      errorToaster(state.get_shop_category_by_id.message);
    }
  }, [key, state]);

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
  }, [state, state.get_places]);

  useEffect(() => {
    if (
      state &&
      state.get_shop_categories &&
      state.get_shop_categories.shopCategories &&
      state.get_shop_categories.shopCategories.length !== 0
    ) {
      let tempArr: ShopCategory[] = [];
      state.get_shop_categories.shopCategories.map(
        (shopCategory: ShopCategory) =>
          tempArr.push({
            _id: shopCategory._id,
            category_name: shopCategory.category_name,
            lower_range: shopCategory.lower_range,
            upper_range: shopCategory.upper_range,
          })
      );
      setShopCategories(tempArr);
    }
  }, [state]);

  useEffect(() => {
    if (
      state &&
      state.add_edit_file &&
      state.add_edit_file.file &&
      state.add_edit_file.file !== null &&
      !state.add_edit_file.isError &&
      state.add_edit_file.message !== ""
    ) {
      successToaster(state.add_edit_file.message);
      setFormData((prev: any) => ({
        ...prev,
        [key]: state.add_edit_file.file._id,
      }));

      dispatch({
        type: RESET_STATE,
        payload: { state: "file" },
      });
    }
  }, [dispatch, formData, key, navigate, state]);

  useEffect(() => {
    if (
      state &&
      state.add_edit_shop &&
      state.add_edit_shop.shop &&
      state.add_edit_shop.shop !== null &&
      !state.add_edit_shop.isError &&
      state.add_edit_shop.message !== ""
    ) {
      successToaster(state.add_edit_shop.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "shops" },
      });
      navigate("/shops");
    }
  }, [dispatch, navigate, state]);

  useEffect(() => {
    if (
      state &&
      state.delete_shop &&
      !state.delete_shop.isError &&
      state.delete_shop.message !== ""
    ) {
      successToaster(state.delete_shop.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "shops" },
      });
      navigate("/shops");
    } else if (state && state.delete_shop && state.delete_shop.isError) {
      errorToaster(state.delete_shop.message);
    }
  }, [dispatch, navigate, id, state]);

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

  const cancelshopHandle = () => {
    navigate("/shops");
  };

  const deleteshopHandle = () => {
    setModalOpen(true);
  };

  const modalHandleClose = () => {
    setModalOpen(false);
  };

  const onDeleteConfirmHandle = () => {
    dispatch({
      type: DELETE_SHOP,
      payload: { id: id },
    });
  };

  const onFileChange = (event: any) => {
    const file = event.target.files[0];
    const key = event.target.name;
    const reader = new FileReader();
    if (fileData[key] && fileData[key]._id) {
      setKey(key);
      dispatch({
        type: DELETE_FILE,
        payload: { id: fileData[key]._id },
      });
    }
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileData((prev: any) => ({
        ...prev,
        [key]: { file_url: reader.result },
      }));
    };
    setFormData((prev: any) => ({
      ...prev,
      [key]: file,
    }));
  };

  const onFileUpload = (key: string) => {
    if (formData[key].length !== 0) {
      let bodyData = new FormData();
      bodyData.append("file", formData[key]);
      setKey(key);
      dispatch({
        type: ADD_FILE,
        payload: bodyData,
      });
    } else {
      setDataError((prev) => ({
        ...prev,
        errors: { ...dataError.errors, [key]: true },
        errorMsg: {
          ...dataError.errorMsg,
          [key]: "Please upload File.",
        },
      }));
    }
  };

  const inputChangeHandle = (fieldName: string, event: any) => {
    let isValid = isEmpty(fieldName, event.target.value);
    if (fieldName === "Email") {
      isValid = emailValidate(fieldName, event.target.value);
    }
    if (fieldName === "Aadhar number") {
      isValid = aadharValidate(fieldName, event.target.value);
    }
    setFormData((prev: any) => ({
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

  const optionalInputChangeHandle = (fieldName: string, event: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const dropDownOnChangeHandle = (
    fieldName: string,
    keyName: string,
    values: any
  ) => {
    const isValid = dropDownValidate(fieldName, values);
    setFormData((prev: any) => ({
      ...prev,
      [keyName]: values[0]._id,
    }));
    setDataError((prev) => ({
      ...prev,
      errors: { ...dataError.errors, [keyName]: isValid.status },
      errorMsg: {
        ...dataError.errorMsg,
        [keyName]: isValid.message,
      },
    }));
  };

  const phoneChangeHandle = (key: string, fieldName: string, value: string) => {
    const isValid = phoneNumberValidate(fieldName, value);
    setFormData((prev: any) => ({
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

  const formSubmitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isShopNameValid = isEmpty("Shop name", formData.shop_name);
    const isOwnerNameValid = isEmpty("Owner name", formData.owner_name);
    const isEmailValid = emailValidate("Email", formData.email);
    const isPhoneNoValid = phoneNumberValidate(
      "Phone number",
      formData.phone_number
    );
    const isAadharNoValid = aadharValidate(
      "Aadhar number",
      formData.aadhar_number
    );
    const isOwnerImgValid = isImageUpload("Owner Image", formData.owner_image);
    const isOwnerAadharValid = isImageUpload(
      "Owner aadhar image",
      formData.owner_aadhar_card
    );
    const isShopImageValid = isImageUpload("Shop image", formData.shop_image);
    const isAddressValid = isEmpty("Address", formData.address);
    const isPlaceValid = dropDownValidate("Place", formData.place);
    const isShopCatValid = dropDownValidate(
      "Shop category",
      formData.shop_category
    );
    if (
      isShopNameValid.status ||
      isOwnerNameValid.status ||
      isEmailValid.status ||
      isPhoneNoValid.status ||
      isAadharNoValid.status ||
      isOwnerImgValid.status ||
      isOwnerAadharValid.status ||
      isShopImageValid.status ||
      isAddressValid.status ||
      isPlaceValid.status ||
      isShopCatValid.status
    ) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          shop_name: isShopNameValid.status,
          owner_name: isOwnerNameValid.status,
          email: isEmailValid.status,
          phone_number: isPhoneNoValid.status,
          aadhar_number: isAadharNoValid.status,
          owner_image: isOwnerImgValid.status,
          owner_aadhar_card: isOwnerAadharValid.status,
          shop_image: isShopImageValid.status,
          address: isAddressValid.status,
          place: isPlaceValid.status,
          shop_category: isShopCatValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          shop_name: isShopNameValid.message,
          owner_name: isOwnerNameValid.message,
          email: isEmailValid.message,
          phone_number: isPhoneNoValid.message,
          aadhar_number: isAadharNoValid.message,
          owner_image: isOwnerImgValid.message,
          owner_aadhar_card: isOwnerAadharValid.message,
          shop_image: isShopImageValid.message,
          address: isAddressValid.message,
          place: isPlaceValid.message,
          shop_category: isShopCatValid.message,
        },
      }));
    } else {
      if (isEdit) {
        dispatch({
          type: EDIT_SHOP,
          payload: { id: id, values: formData },
        });
      } else {
        dispatch({
          type: ADD_SHOP,
          payload: formData,
        });
      }
    }
  };
  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Shop category"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="shop_mainContainer">
          <Box className="shop_titleContainer">
            <Typography className="shop_titleText">
              {isEdit
                ? configJSON.editShopTitleText
                : configJSON.createShopTitleText}
            </Typography>
          </Box>
          <form onSubmit={formSubmitHandle}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Box className="shop_textFieldContainer">
                    <CustomTextField
                      id="shop_name"
                      type="text"
                      label="Shop name"
                      name="shop_name"
                      value={formData.shop_name}
                      error={dataError.errors.shop_name}
                      errorText={dataError.errorMsg.shop_name}
                      onChange={inputChangeHandle.bind(this, "Shop name")}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="shop_textFieldContainer">
                    <CustomTextField
                      id="owner_name"
                      type="text"
                      label="Owner name"
                      name="owner_name"
                      value={formData.owner_name}
                      error={dataError.errors.owner_name}
                      errorText={dataError.errorMsg.owner_name}
                      onChange={inputChangeHandle.bind(this, "Owner name")}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="shop_textFieldContainer">
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
                </Grid>
                <Grid item xs={4}>
                  <Box className="shop_textFieldContainer">
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
                </Grid>
                <Grid item xs={4}>
                  <Box className="shop_textFieldContainer">
                    <PhoneTextField
                      value={formData.optional_number}
                      onChange={phoneChangeHandle.bind(
                        this,
                        "optional_number",
                        "Optional number"
                      )}
                      label="Optional number"
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="shop_textFieldContainer">
                    <CustomTextField
                      id="aadhar_number"
                      type="text"
                      label="Aadhar number"
                      name="aadhar_number"
                      value={formData.aadhar_number}
                      error={dataError.errors.aadhar_number}
                      errorText={dataError.errorMsg.aadhar_number}
                      onChange={inputChangeHandle.bind(this, "Aadhar number")}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="shop_textFieldContainer">
                    <CustomTextField
                      id="second_owner_name"
                      type="text"
                      label="Second owner name"
                      name="second_owner_name"
                      value={formData.second_owner_name}
                      onChange={optionalInputChangeHandle.bind(
                        this,
                        "Second owner name"
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="shop_textFieldContainer">
                    <PhoneTextField
                      value={formData.second_owner_number}
                      onChange={phoneChangeHandle.bind(
                        this,
                        "second_owner_number",
                        "Second owner number"
                      )}
                      label="Second owner number"
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="shop_textFieldContainer">
                    <DropDown
                      label="Shop category"
                      name="shop_category"
                      multi={false}
                      disabled={false}
                      clearable={false}
                      required={false}
                      labelField={"category_name"}
                      valueField={"_id"}
                      data={shopCategories}
                      values={formData.shop_category}
                      placeholder="Please select shop category"
                      error={dataError.errors.shop_category}
                      errorText={dataError.errorMsg.shop_category}
                      onChange={dropDownOnChangeHandle.bind(
                        this,
                        "Shop category",
                        "shop_category"
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box className="shop_textFieldContainer">
                    <CustomTextField
                      id="address"
                      type="text"
                      label="Address"
                      name="address"
                      placeholder=""
                      multiline={false}
                      minRows={1}
                      value={formData.address}
                      error={dataError.errors.address}
                      errorText={dataError.errorMsg.address}
                      onChange={inputChangeHandle.bind(this, "Address")}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="shop_textFieldContainer">
                    <DropDown
                      label="Place"
                      name="place"
                      multi={false}
                      disabled={false}
                      clearable={false}
                      required={false}
                      data={places}
                      labelField={"town"}
                      valueField={"_id"}
                      values={formData.place}
                      placeholder="Please select Place"
                      error={dataError.errors.place}
                      errorText={dataError.errorMsg.place}
                      onChange={dropDownOnChangeHandle.bind(
                        this,
                        "Place",
                        "place"
                      )}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Divider className="shop_textFieldContainer" />
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography className="shop_titleText">Images</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Box className="shop_textFieldContainer">
                    <ImageUpload
                      profile_placeHolder={profile_placeHolder}
                      title={"Owner Image"}
                      description={
                        "The owner image should see perfectly and image size should be less than 5 Mb."
                      }
                      errorText={dataError.errorMsg.owner_image}
                      imageUrl={fileData.owner_image.file_url}
                      onFileChange={onFileChange}
                      name="owner_image"
                      onClick={onFileUpload}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="shop_textFieldContainer">
                    <ImageUpload
                      profile_placeHolder={shop_placeHolder}
                      title={"Shop Image"}
                      description={
                        "The shop image should see perfectly and image size should be less than 5 Mb."
                      }
                      errorText={dataError.errorMsg.shop_image}
                      imageUrl={fileData.shop_image.file_url}
                      onFileChange={onFileChange}
                      name="shop_image"
                      onClick={onFileUpload}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="shop_textFieldContainer">
                    <ImageUpload
                      profile_placeHolder={card_placeHolder}
                      title={"Owner aadhar card Image"}
                      description={
                        "The Owner aadhar card should see perfectly and image size should be less than 5 Mb."
                      }
                      errorText={dataError.errorMsg.owner_aadhar_card}
                      imageUrl={fileData.owner_aadhar_card.file_url}
                      onFileChange={onFileChange}
                      name="owner_aadhar_card"
                      onClick={onFileUpload}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box className="shop_buttonSubContainer">
              {isEdit ? (
                <Box className="shop_BtnContainer">
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
                    onClick={deleteshopHandle}
                  />
                </Box>
              ) : (
                <Box className="shop_BtnContainer">
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
                    onClick={cancelshopHandle}
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

export default TodoShop;
