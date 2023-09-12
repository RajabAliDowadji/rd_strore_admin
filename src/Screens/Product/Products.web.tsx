import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard.web";
import { Box } from "@material-ui/core";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { useNavigate } from "react-router-dom";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import "./Products.web.css";

const configJSON = require("../../Constants/Products");

const Products = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const rows = [
    {
      _id: "64eb4cdd8a92b57617fee7ba",
      product_title: "Amul Quality Ghee",
      product_size: "1000g",
      product_MRP_price: 600,
      product_price: 550,
      product_sub_category: {
        sub_category_name: "Buffalo Ghee",
      },
      product_brand: {
        brand_name: "Amul",
      },
      is_vegetarian: true,
      is_published: false,
    },
  ];
  const addProductHandle = () => {
    navigate("/products/create");
  };
  const editProductHandle = (id: string) => {
    navigate(`/products/edit/${id}`);
  };
  const viewProductHandle = (id: string) => {
    navigate(`/products/view/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/products");
    setModalOpen(false);
    //TODO DELETE PRODUCT API CALL
  };
  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Product"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="product_mainContainer">
          <Box className="product_buttonContainer">
            <ActiveButton
              title={configJSON.productBtnTxt}
              disabled={false}
              onClick={addProductHandle}
            />
          </Box>
          <DataTable
            rows={rows}
            columns={configJSON.productColumns}
            onViewClick={viewProductHandle}
            onEditClick={editProductHandle}
            onDeleteClick={deleteBtnClickHandle}
            isAction={true}
          />
        </Box>
      </Dashboard>
    </Box>
  );
};

export default Products;
