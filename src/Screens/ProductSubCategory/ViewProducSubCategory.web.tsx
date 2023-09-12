import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductSubCategories.web.css";

const configJSON = require("../../Constants/Products");

const ViewProductSubCategory = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const addProductSubCatHandle = () => {
    navigate("/product-sub-categories/create");
  };
  const editProductSubCatHandle = () => {
    navigate(`/product-sub-categories/edit/${id}`);
  };
  const deleteProductSubCatHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/product-sub-categories");
    //TODO DELETE PRODUCT SUBCATEGORY API CALL
  };
  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Product sub-category"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="prodSubCategory_mainContainer">
          <Box className="prodSubCategory_buttonContainer">
            <ActiveButton
              title={configJSON.productTypeBtnTxt}
              disabled={false}
              onClick={addProductSubCatHandle}
            />
          </Box>
          <Box>
            <Box className="prodSubCategory_textFieldContainer">
              <CustomTextField
                id="_id"
                type="text"
                label="Id"
                name="_id"
                value="64eafd3438f621bdc72a570b"
                disabled={true}
              />
            </Box>
            <Box className="prodSubCategory_textFieldContainer">
              <CustomTextField
                id="sub_category_name"
                type="text"
                label="Sub-category name"
                name="sub_category_name"
                value="Buffalo Ghee"
                disabled={true}
              />
            </Box>
            <Box className="prodSubCategory_textFieldContainer">
              <CustomTextField
                id="product_category"
                type="text"
                label="Product category"
                name="product_category"
                value="Ghee"
                disabled={true}
              />
            </Box>
            <Box className="prodSubCategory_textFieldContainer">
              <CustomTextField
                id="search_name"
                type="text"
                label="Search name"
                name="search_name"
                value=""
                disabled={true}
              />
            </Box>
          </Box>
          <Box className="prodSubCategory_buttonSubContainer">
            <ActiveButton
              title={configJSON.editBtnTxt}
              disabled={false}
              onClick={editProductSubCatHandle}
              style={{ width: "205px", margin: "0px 15px 0px 0px" }}
            />
            <DeleteButton
              title={configJSON.deleteBtnTxt}
              disabled={false}
              onClick={deleteProductSubCatHandle}
              style={{ width: "205px", margin: "0px 0px 0px 15px" }}
            />
          </Box>
        </Box>
      </Dashboard>
    </Box>
  );
};
export default ViewProductSubCategory;
