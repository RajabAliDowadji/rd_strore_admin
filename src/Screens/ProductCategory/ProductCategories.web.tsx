import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard.web";
import { Box } from "@material-ui/core";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import { useNavigate } from "react-router-dom";
import "./ProductCategories.web.css";

const configJSON = require("../../Constants/Products");

const ProductCategories = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const rows = [
    {
      _id: "64eb2fb3537c71c902a55602",
      category_name: "Ghee",
      product_type: {
        type_name: "Grocceries",
      },
      search_name: "",
    },
  ];
  const addProductTypeHandle = () => {
    navigate("/product-categories/create");
  };
  const editProductTypeHandle = (id: string) => {
    navigate(`/product-categories/edit/${id}`);
  };
  const viewProductTypeClickHandle = (id: string) => {
    navigate(`/product-categories/view/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/product-categories");
    setModalOpen(false);
    //TODO DELETE PRODUCT TYPE API CALL
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
              title={configJSON.productCatBtnTxt}
              disabled={false}
              onClick={addProductTypeHandle}
            />
          </Box>
          <DataTable
            rows={rows}
            columns={configJSON.productCatColumns}
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

export default ProductCategories;
