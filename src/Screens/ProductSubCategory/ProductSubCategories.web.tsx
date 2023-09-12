import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard.web";
import { Box } from "@material-ui/core";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import { useNavigate } from "react-router-dom";
import "./ProductSubCategories.web.css";

const configJSON = require("../../Constants/Products");

const ProductSubCategories = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const rows = [
    {
      _id: "64eb2fb3537c71c902a55602",
      sub_category_name: "Buffalo Ghee",
      product_category: {
        category_name: "Ghee",
      },
      search_name: "",
    },
  ];
  const addProductTypeHandle = () => {
    navigate("/product-sub-categories/create");
  };
  const editProductTypeHandle = (id: string) => {
    navigate(`/product-sub-categories/edit/${id}`);
  };
  const viewProductTypeClickHandle = (id: string) => {
    navigate(`/product-sub-categories/view/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/product-sub-categories");
    setModalOpen(false);
    //TODO DELETE PRODUCT TYPE API CALL
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
              title={configJSON.productSubCatBtnTxt}
              disabled={false}
              onClick={addProductTypeHandle}
            />
          </Box>
          <DataTable
            rows={rows}
            columns={configJSON.productSubCatColumns}
            onViewClick={viewProductTypeClickHandle}
            onEditClick={editProductTypeHandle}
            onDeleteClick={deleteBtnClickHandle}
            isAction={true}
          />
        </Box>
      </Dashboard>
    </Box>
  );
};

export default ProductSubCategories;
