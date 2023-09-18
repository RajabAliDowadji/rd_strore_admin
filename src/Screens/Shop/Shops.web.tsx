import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../Dashboard/Dashboard.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import { GET_SHOPS } from "../../Hooks/Saga/Constant";
import { GetShopColumns, Shop } from "../../Modal/GetShops.modal";
import NoDataFound from "../../Ui/Data/NoDataFound.web";
import "./Shops.web.css";

const configJSON = require("../../Constants/Shop");

const Shops = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [shops, setShops] = useState<GetShopColumns[]>([]);

  useEffect(() => {
    dispatch({
      type: GET_SHOPS,
    });
  }, [dispatch]);

  useEffect(() => {
    if (
      state &&
      state.get_shops &&
      state.get_shops.shops &&
      state.get_shops.shops.length !== 0
    ) {
      let tempArr: GetShopColumns[] = [];
      state.get_shops.shops.map((shop: Shop) =>
        tempArr.push({
          _id: shop._id,
          shop_name: shop.shop_name,
          owner_name: shop.owner_name,
          email: shop.email,
          phone_number: shop.phone_number,
          isActive: shop.isActive,
          isCompleted: shop.isCompleted,
        })
      );
      setShops(tempArr);
    }
  }, [state]);

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
          {shops.length === 0 ? (
            <NoDataFound />
          ) : (
            <DataTable
              rows={shops}
              columns={configJSON.shopColumns}
              onViewClick={viewShopHandle}
              onEditClick={editShopHandle}
              onDeleteClick={deleteBtnClickHandle}
              isAction={true}
            />
          )}
        </Box>
      </Dashboard>
    </Box>
  );
};

export default Shops;
