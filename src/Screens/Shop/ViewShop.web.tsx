import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Divider, Grid, Typography } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ImageUpload from "../../Ui/Image/ImageUpload.web";
import {
  profile_placeHolder,
  shop_placeHolder,
  card_placeHolder,
} from "./assets";
import "./Shops.web.css";

const configJSON = require("../../Constants/Shop");

const ViewShop = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const addShopCategoryHandle = () => {
    navigate("/shops/create");
  };
  const editShopCategoryHandle = () => {
    navigate(`/shops/edit/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/shops");
    //TODO DELETE SHOP CATEGORY API CALL
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
              title={configJSON.shopCategoryBtnTxt}
              disabled={false}
              onClick={addShopCategoryHandle}
            />
          </Box>
          <Box>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Box className="shop_textFieldContainer">
                    <CustomTextField
                      id="shop_name"
                      type="text"
                      label="Shop name"
                      name="shop_name"
                      value="RDStore"
                      disabled={true}
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
                      value="officewala Abbas Bhai"
                      disabled={true}
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
                      value="abbasvora04@gmail.com"
                      disabled={true}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="shop_textFieldContainer">
                    <CustomTextField
                      id="phone_number"
                      type="text"
                      label="Phone number"
                      name="phone_number"
                      disabled={true}
                      value="+919979144079"
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="shop_textFieldContainer">
                    <CustomTextField
                      id="optional_number"
                      type="text"
                      label="Optional number"
                      name="optional_number"
                      disabled={true}
                      value="+917777010688"
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
                      value="401417737623"
                      disabled={true}
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
                      disabled={true}
                      value="Femidaben Abbas Bhai"
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="shop_textFieldContainer">
                    <CustomTextField
                      id="second_owner_number"
                      type="text"
                      label="Second owner number"
                      name="second_owner_number"
                      disabled={true}
                      value="+919727366046"
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="shop_textFieldContainer">
                    <CustomTextField
                      id="shop_category"
                      type="text"
                      label="Shop category"
                      name="shop_category"
                      disabled={true}
                      value="Bronze"
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
                      disabled={true}
                      value="Lakshmi Naryana chowk,Voravad,Halvad"
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="shop_textFieldContainer">
                    <CustomTextField
                      id="place"
                      type="text"
                      label="Place"
                      name="place"
                      disabled={true}
                      value="Halvad"
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
                      imageUrl={""}
                      onFileChange={undefined}
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
                      imageUrl={""}
                      onFileChange={undefined}
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
                      imageUrl={""}
                      onFileChange={undefined}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box className="place_buttonSubContainer">
            <ActiveButton
              title={configJSON.editBtnTxt}
              disabled={false}
              onClick={editShopCategoryHandle}
              style={{ width: "205px", margin: "0px 15px 0px 0px" }}
            />
            <DeleteButton
              title={configJSON.deleteBtnTxt}
              disabled={false}
              onClick={deleteBtnClickHandle}
              style={{ width: "205px", margin: "0px 0px 0px 15px" }}
            />
          </Box>
        </Box>
      </Dashboard>
    </Box>
  );
};

export default ViewShop;
