import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import "./ShopCategories.web.css";

const configJSON = require("../../Constants/Shop");

const ViewShopCategory = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const addShopCategoryHandle = () => {
    navigate("/shop-categories/create");
  };
  const editShopCategoryHandle = () => {
    navigate(`/shop-categories/edit/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/shop-categories");
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
            <Box className="place_textFieldContainer">
              <CustomTextField
                id="_id"
                type="text"
                label="Id"
                name="_id"
                value="64eafd3438f621bdc72a570b"
                disabled={true}
              />
            </Box>
            <Box className="place_textFieldContainer">
              <CustomTextField
                id="shop_category_name"
                type="text"
                label="Category name"
                name="shop_category_name"
                value="Bronze"
                disabled={true}
              />
            </Box>
            <Box className="place_textFieldContainer">
              <CustomTextField
                id="lower_range"
                type="number"
                label="Lower range"
                name="lower_range"
                value="1"
                disabled={true}
              />
            </Box>

            <Box className="place_textFieldContainer">
              <CustomTextField
                id="upper_range"
                type="number"
                label="Upper range"
                name="upper_range"
                value={"10000"}
                disabled={true}
              />
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

export default ViewShopCategory;
