import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard.web";
import { Box } from "@material-ui/core";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { useNavigate } from "react-router-dom";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import "./ProductBrands.web.css";

const configJSON = require("../../Constants/Products");

const ProductBrands = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const rows = [
    {
      _id: "64eb2fb3537c71c902a55602",
      brand_name: "Amul",
      search_name: "",
    },
  ];
  const addProductBrandHandle = () => {
    navigate("/product-brands/create");
  };
  const editProductBrandHandle = (id: string) => {
    navigate(`/product-brands/edit/${id}`);
  };
  const viewProductBrandClickHandle = (id: string) => {
    navigate(`/product-brands/view/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/product-brands");
    setModalOpen(false);
    //TODO DELETE PRODUCT TYPE API CALL
  };
  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Product brand"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="prodBrand_mainContainer">
          <Box className="prodBrand_buttonContainer">
            <ActiveButton
              title={configJSON.productBrandBtnTxt}
              disabled={false}
              onClick={addProductBrandHandle}
            />
          </Box>
          <DataTable
            rows={rows}
            columns={configJSON.productBrandColumns}
            onViewClick={viewProductBrandClickHandle}
            onEditClick={editProductBrandHandle}
            onDeleteClick={deleteBtnClickHandle}
            isAction={true}
          />
        </Box>
      </Dashboard>
    </Box>
  );
};

export default ProductBrands;
