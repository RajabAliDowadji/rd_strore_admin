import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard.web";
import { Box } from "@material-ui/core";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import { useNavigate } from "react-router-dom";
import "./ShopCategories.web.css";

const configJSON = require("../../Constants/Shop");

const ShopCategories = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const rows = [
    {
      _id: "64eb02a6b6d2a72189288213",
      category_name: "Bronze",
      lower_range: 1,
      upper_range: 10000,
    },
  ];
  const addShopCategoryHandle = () => {
    navigate("/shop-categories/create");
  };
  const editShopCategoryHandle = (id: string) => {
    navigate(`/shop-categories/edit/${id}`);
  };
  const viewShopCategoryHandle = (id: string) => {
    navigate(`/shop-categories/view/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/shop-categories");
    setModalOpen(false);
    //TODO DELETE SHOP CATEGORY API CALL
  };
  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Shop category"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="shopCategory_mainContainer">
          <Box className="shopCategory_buttonContainer">
            <ActiveButton
              title={configJSON.shopCategoryBtnTxt}
              disabled={false}
              onClick={addShopCategoryHandle}
            />
          </Box>
          <DataTable
            rows={rows}
            columns={configJSON.shopCategoriesColumns}
            onViewClick={viewShopCategoryHandle}
            onEditClick={editShopCategoryHandle}
            onDeleteClick={deleteBtnClickHandle}
            isAction={true}
          />
        </Box>
      </Dashboard>
    </Box>
  );
};

export default ShopCategories;
