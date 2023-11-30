import React, { useEffect, useMemo, useState } from "react";
import { Box, Divider, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import DashboardPage from "../DashboardPage/DashboardPage.web";
import {
  DELETE_SHOP,
  GET_SHOP_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import { errorToaster, successToaster } from "../../Utils/common";
import "./ShopPage.web.css";
import { GetShopByIdResponse } from "../../Modal/GetShopById.modal";
import ImageUpload from "../../Ui/Image/ImageUpload.web";
import {
  card_placeHolder,
  profile_placeHolder,
  shop_placeHolder,
} from "./assets";

const configJSON = require("../../Constants/Shop");

const ViewShopPage = () => {
  let { id } = useParams();
  const initialData = useMemo(() => {
    return {
      _id: "",
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>(initialData);

  useEffect(() => {
    dispatch({
      type: GET_SHOP_BY_ID,
      payload: { id: id },
    });
  }, [dispatch, id]);

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
    if (
      state &&
      state.get_shop_by_id &&
      state.get_shop_by_id.shop &&
      state.get_shop_by_id.shop !== null
    ) {
      let temp: GetShopByIdResponse = initialData;
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
        state.get_shop_by_id.shop.owner_image.file_url
          ? state.get_shop_by_id.shop.owner_image.file_url
          : "";
      temp.owner_aadhar_card =
        state.get_shop_by_id.shop.owner_aadhar_card &&
        state.get_shop_by_id.shop.owner_aadhar_card !== null &&
        state.get_shop_by_id.shop.owner_aadhar_card.file_url
          ? state.get_shop_by_id.shop.owner_aadhar_card.file_url
          : "";
      temp.shop_image =
        state.get_shop_by_id.shop.shop_image &&
        state.get_shop_by_id.shop.shop_image !== null &&
        state.get_shop_by_id.shop.shop_image.file_url
          ? state.get_shop_by_id.shop.shop_image.file_url
          : "";
      temp.address = state.get_shop_by_id.shop.address;
      temp.place = state.get_shop_by_id.shop.place.pincode;
      temp.shop_category =
        state.get_shop_by_id.shop.shop_category.category_name;

      setFormData((prev: GetShopByIdResponse) => ({
        ...prev,
        ...temp,
      }));
    }
  }, [initialData, state]);

  const addShopHandle = () => {
    navigate("/shops/create");
    dispatch({
      type: RESET_STATE,
      payload: { state: "shops" },
    });
  };
  const editShopHandle = () => {
    navigate(`/shops/edit/${id}`);
  };
  const deleteShopHandle = () => {
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

  return (
    <Box>
      <DashboardPage>
        <DeleteModal
          open={modalOpen}
          title="Shop"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="shoppage_mainContainer">
          <Box className="shoppage_viewbuttonContainer">
            <ActiveButton
              title={configJSON.createShopTitleText}
              disabled={false}
              onClick={addShopHandle}
              style={{ width: "max-content" }}
            />
          </Box>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Box className="shoppage_textFieldContainer">
                  <CustomTextField
                    id="shop_name"
                    type="text"
                    label="Shop name"
                    name="shop_name"
                    value={formData.shop_name}
                    disabled={true}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className="shoppage_textFieldContainer">
                  <CustomTextField
                    id="owner_name"
                    type="text"
                    label="Owner name"
                    name="owner_name"
                    value={formData.owner_name}
                    disabled={true}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className="shoppage_textFieldContainer">
                  <CustomTextField
                    id="email"
                    type="text"
                    label="Email"
                    name="email"
                    value={formData.email}
                    disabled={true}
                  />
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box className="shoppage_textFieldContainer">
                  <CustomTextField
                    id="phone_number"
                    type="text"
                    label="Phone number"
                    name="phone_number"
                    disabled={true}
                    value={formData.phone_number}
                  />
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box className="shoppage_textFieldContainer">
                  <CustomTextField
                    id="optional_number"
                    type="text"
                    label="Optional number"
                    name="optional_number"
                    disabled={true}
                    value={formData.optional_number}
                  />
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box className="shoppage_textFieldContainer">
                  <CustomTextField
                    id="aadhar_number"
                    type="text"
                    label="Aadhar number"
                    name="aadhar_number"
                    value={formData.aadhar_number}
                    disabled={true}
                  />
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box className="shoppage_textFieldContainer">
                  <CustomTextField
                    id="second_owner_name"
                    type="text"
                    label="Second owner name"
                    name="second_owner_name"
                    disabled={true}
                    value={formData.second_owner_name}
                  />
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box className="shoppage_textFieldContainer">
                  <CustomTextField
                    id="second_owner_number"
                    type="text"
                    label="Second owner number"
                    name="second_owner_number"
                    disabled={true}
                    value={formData.second_owner_number}
                  />
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box className="shoppage_textFieldContainer">
                  <CustomTextField
                    id="shop_category"
                    type="text"
                    label="Shop category"
                    name="shop_category"
                    disabled={true}
                    value={formData.shop_category}
                  />
                </Box>
              </Grid>

              <Grid item xs={8}>
                <Box className="shoppage_textFieldContainer">
                  <CustomTextField
                    id="address"
                    type="text"
                    label="Address"
                    name="address"
                    placeholder=""
                    multiline={false}
                    minRows={1}
                    disabled={true}
                    value={formData.address}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className="shoppage_textFieldContainer">
                  <CustomTextField
                    id="place"
                    type="text"
                    label="Place"
                    name="place"
                    disabled={true}
                    value={formData.place}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider className="shoppage_textFieldContainer" />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography className="shoppage_titleText">Images</Typography>
            </Grid>
            <Grid item xs={4}>
              <Box className="shoppage_textFieldContainer">
                <ImageUpload
                  profile_placeHolder={profile_placeHolder}
                  title={"Owner Image"}
                  description={
                    "The owner image should see perfectly and image size should be less than 5 Mb."
                  }
                  imageUrl={formData.owner_image}
                  name={"owner_image"}
                  view={true}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className="shoppage_textFieldContainer">
                <ImageUpload
                  profile_placeHolder={shop_placeHolder}
                  title={"Shop Image"}
                  description={
                    "The shop image should see perfectly and image size should be less than 5 Mb."
                  }
                  imageUrl={formData.shop_image}
                  name={"shop_image"}
                  view={true}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className="shoppage_textFieldContainer">
                <ImageUpload
                  profile_placeHolder={card_placeHolder}
                  title={"Owner aadhar card Image"}
                  description={
                    "The Owner aadhar card should see perfectly and image size should be less than 5 Mb."
                  }
                  imageUrl={formData.owner_aadhar_card}
                  name={"owner_aadhar_card"}
                  view={true}
                />
              </Box>
            </Grid>
          </Grid>
          <Box className="shoppage_BtnContainer">
            <ActiveButton
              title={configJSON.editBtnTxt}
              disabled={false}
              onClick={editShopHandle}
              style={{ margin: "0px 15px 0px 0px" }}
            />
            <DeleteButton
              title={configJSON.deleteBtnTxt}
              disabled={false}
              onClick={deleteShopHandle}
              style={{ margin: "0px 0px 0px 15px" }}
            />
          </Box>
        </Box>
      </DashboardPage>
    </Box>
  );
};
export default ViewShopPage;
