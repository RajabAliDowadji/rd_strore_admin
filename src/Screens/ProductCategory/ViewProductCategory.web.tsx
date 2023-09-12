import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductCategories.web.css";

const configJSON = require("../../Constants/Products");

const ViewProductCategory = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const addProductTypeHandle = () => {
    navigate("/product-categories/create");
  };
  const editProductTypeHandle = () => {
    navigate(`/product-categories/edit/${id}`);
  };
  const deleteProductTypeHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/product-categories");
    //TODO DELETE PRODUCT CATEGORY API CALL
  };
  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Product type"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="prodCategory_mainContainer">
          <Box className="prodCategory_buttonContainer">
            <ActiveButton
              title={configJSON.productTypeBtnTxt}
              disabled={false}
              onClick={addProductTypeHandle}
            />
          </Box>
          <Box>
            <Box className="prodCategory_textFieldContainer">
              <CustomTextField
                id="_id"
                type="text"
                label="Id"
                name="_id"
                value="64eafd3438f621bdc72a570b"
                disabled={true}
              />
            </Box>
            <Box className="prodCategory_textFieldContainer">
              <CustomTextField
                id="category_name"
                type="text"
                label="Category name"
                name="category_name"
                value="Ghee"
                disabled={true}
              />
            </Box>
            <Box className="prodCategory_textFieldContainer">
              <CustomTextField
                id="product_type"
                type="text"
                label="product type"
                name="product_type"
                value="Grocceries"
                disabled={true}
              />
            </Box>
            <Box className="prodCategory_textFieldContainer">
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
          <Box className="prodCategory_buttonSubContainer">
            <ActiveButton
              title={configJSON.editBtnTxt}
              disabled={false}
              onClick={editProductTypeHandle}
              style={{ width: "205px", margin: "0px 15px 0px 0px" }}
            />
            <DeleteButton
              title={configJSON.deleteBtnTxt}
              disabled={false}
              onClick={deleteProductTypeHandle}
              style={{ width: "205px", margin: "0px 0px 0px 15px" }}
            />
          </Box>
        </Box>
      </Dashboard>
    </Box>
  );
};
export default ViewProductCategory;
