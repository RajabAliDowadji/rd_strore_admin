import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard.web";
import { Box } from "@material-ui/core";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import { useNavigate } from "react-router-dom";
import "./ProductInventories.web.css";

const configJSON = require("../../Constants/Products");

const ProductInventories = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const rows = [
    {
      _id: "64eb569e0165857d2237d1ec",
      quantity: 10,
      product: {
        product_title: "Amul Quality Ghee",
        product_size: "1000g",
        product_MRP_price: 600,
        product_price: 550,
        product_sub_category: "64eb34721ab30213d3853b82",
        product_brand: "64eb462cf0896dfc3973fe70",
        is_vegetarian: true,
      },
    },
  ];
  const addProductiInvHandle = () => {
    navigate("/product-inventories/create");
  };
  const editProductInvHandle = (id: string) => {
    navigate(`/product-inventories/edit/${id}`);
  };
  const viewProductInvHandle = (id: string) => {
    navigate(`/product-inventories/view/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/product-inventories");
    setModalOpen(false);
    //TODO DELETE PRODUCT INVENTORY API CALL
  };
  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Product Inventory"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="productInventory_mainContainer">
          <Box className="productInventory_buttonContainer">
            <ActiveButton
              title={configJSON.productInvBtnTxt}
              disabled={false}
              onClick={addProductiInvHandle}
            />
          </Box>
          <DataTable
            rows={rows}
            columns={configJSON.productInvColumns}
            onViewClick={viewProductInvHandle}
            onEditClick={editProductInvHandle}
            onDeleteClick={deleteBtnClickHandle}
            isAction={true}
          />
        </Box>
      </Dashboard>
    </Box>
  );
};

export default ProductInventories;
