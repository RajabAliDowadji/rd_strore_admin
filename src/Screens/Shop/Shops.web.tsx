import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard.web";
import { Box } from "@material-ui/core";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { useNavigate } from "react-router-dom";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import "./Shops.web.css";

const configJSON = require("../../Constants/Shop");

const Shops = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const rows = [
    {
      _id: "64eb02a6b6d2a72189288213",
      shop_name: "RDStore",
      owner_name: "officewala Abbas Bhai",
      email: "abbasvora04@gmail.com",
      phone_number: "+919727366046",
      isActive: true,
      isCompleted: false,
    },
  ];
  const addShopHandle = () => {
    navigate("/shops/create");
  };
  const editShopHandle = (id: string) => {
    navigate(`/shops/edit/${id}`);
  };
  const viewShopHandle = (id: string) => {
    navigate(`/shops/view/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/shops");
    setModalOpen(false);
    //TODO DELETE SHOP CATEGORY API CALL
  };
  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Shop"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="shop_mainContainer">
          <Box className="shop_buttonContainer">
            <ActiveButton
              title={configJSON.shopBtnTxt}
              disabled={false}
              onClick={addShopHandle}
            />
          </Box>
          <DataTable
            rows={rows}
            columns={configJSON.shopColumns}
            onViewClick={viewShopHandle}
            onEditClick={editShopHandle}
            onDeleteClick={deleteBtnClickHandle}
            isAction={true}
          />
        </Box>
      </Dashboard>
    </Box>
  );
};

export default Shops;
