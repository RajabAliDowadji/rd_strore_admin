import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import { DELETE_SHOP, GET_SHOPS, RESET_STATE } from "../../Hooks/Saga/Constant";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { errorToaster, successToaster } from "../../Utils/common";
import NoDataFound from "../../Ui/Data/NoDataFound.web";
import DashboardPage from "../DashboardPage/DashboardPage.web";
import { GetShopColumns, Shop } from "../../Modal/GetShops.modal";
import "./ShopPage.web.css";

const configJSON = require("../../Constants/Shop");

const ShopsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [id, setId] = useState<string>("");
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
    } else if (
      state &&
      state.get_shops &&
      state.get_shops.shops &&
      state.get_shops.shops.length === 0
    ) {
      setShops([]);
    }
  }, [state]);

  useEffect(() => {
    if (
      state &&
      state.delete_shop &&
      !state.delete_shop.isError &&
      state.delete_shop.message !== ""
    ) {
      successToaster(state.delete_shop.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "shops" },
      });
      navigate("/shops");
    } else if (state && state.delete_shop && state.delete_shop.isError) {
      errorToaster(state.delete_shop.message);
    }
  }, [dispatch, navigate, id, state]);

  const addShopHandle = () => {
    navigate("/shops/create");
  };
  const editShopHandle = (id: string) => {
    navigate(`/shops/edit/${id}`);
  };
  const viewShopHandle = (id: string) => {
    navigate(`/shops/view/${id}`);
  };
  const deleteBtnClickHandle = (id: string) => {
    setId(id);
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    dispatch({
      type: DELETE_SHOP,
      payload: { id: id },
    });
    setModalOpen(false);
  };
  return (
    <Box>
      <DashboardPage>
        <DeleteModal
          open={modalOpen}
          title="Shop"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="shopPage_buttonContainer">
          <Typography className="shopPage_maintitleText">Shops</Typography>
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
      </DashboardPage>
    </Box>
  );
};

export default ShopsPage;
