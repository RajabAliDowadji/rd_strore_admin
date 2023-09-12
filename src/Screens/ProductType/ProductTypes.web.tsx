import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard.web";
import { Box } from "@material-ui/core";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { useNavigate } from "react-router-dom";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import "./ProductTypes.web.css";

const configJSON = require("../../Constants/Products");

const ProductTypes = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const rows = [
    {
      _id: "64eb2fb3537c71c902a55602",
      type_name: "Grocceries",
      search_name: "",
    },
  ];
  const addProductTypeHandle = () => {
    navigate("/product-types/create");
  };
  const editProductTypeHandle = (id: string) => {
    navigate(`/product-types/edit/${id}`);
  };
  const viewProductTypeClickHandle = (id: string) => {
    navigate(`/product-types/view/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/product-types");
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
        <Box className="productType_mainContainer">
          <Box className="productType_buttonContainer">
            <ActiveButton
              title={configJSON.productTypeBtnTxt}
              disabled={false}
              onClick={addProductTypeHandle}
            />
          </Box>
          <DataTable
            rows={rows}
            columns={configJSON.productTypeColumns}
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

export default ProductTypes;
