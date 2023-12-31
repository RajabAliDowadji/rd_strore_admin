import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import {
  DELETE_SHOP_CATEGORY,
  GET_SHOP_CATEGORIES,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { errorToaster, successToaster } from "../../Utils/common";
import NoDataFound from "../../Ui/Data/NoDataFound.web";
import DashboardPage from "../DashboardPage/DashboardPage.web";
import { ShopCategory } from "../../Modal/GetShopCategories.modal";
import "./ShopCategoryPage.web.css";

const configJSON = require("../../Constants/Shop");

const ShopCategoryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [shopCategories, setShopCategories] = useState<ShopCategory[]>([]);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    dispatch({
      type: GET_SHOP_CATEGORIES,
    });
  }, [dispatch]);

  useEffect(() => {
    if (
      state &&
      state.get_shop_categories &&
      state.get_shop_categories.shopCategories &&
      state.get_shop_categories.shopCategories.length !== 0
    ) {
      let tempArr: ShopCategory[] = [];
      state.get_shop_categories.shopCategories.map(
        (shopCategory: ShopCategory) =>
          tempArr.push({
            _id: shopCategory._id,
            category_name: shopCategory.category_name,
            lower_range: shopCategory.lower_range,
            upper_range: shopCategory.upper_range,
          })
      );
      setShopCategories(tempArr);
    } else if (
      state &&
      state.get_shop_categories &&
      state.get_shop_categories.shopCategories &&
      state.get_shop_categories.shopCategories.length === 0
    ) {
      setShopCategories([]);
    }
  }, [state]);

  useEffect(() => {
    if (
      state &&
      state.delete_shop_category &&
      !state.delete_shop_category.isError &&
      state.delete_shop_category.message !== ""
    ) {
      successToaster(state.delete_shop_category.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "shop-categories" },
      });
    } else if (
      state &&
      state.delete_shop_category &&
      state.delete_shop_category.isError
    ) {
      errorToaster(state.delete_shop_category.message);
    }
  }, [dispatch, navigate, id, state]);

  const addShopCategoryHandle = () => {
    navigate("/shop-categories/create");
  };
  const editShopCategoryHandle = (id: string) => {
    navigate(`/shop-categories/edit/${id}`);
  };
  const viewShopCategoryHandle = (id: string) => {
    navigate(`/shop-categories/view/${id}`);
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
      type: DELETE_SHOP_CATEGORY,
      payload: { id: id },
    });
    setModalOpen(false);
  };

  return (
    <Box>
      <DashboardPage>
        <DeleteModal
          open={modalOpen}
          title="Shop Category"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="shopCategoryPage_buttonContainer">
          <Typography className="shopCategoryPage_maintitleText">
            Shop Category
          </Typography>
          <ActiveButton
            title={configJSON.shopCategoryBtnTxt}
            disabled={false}
            onClick={addShopCategoryHandle}
            style={{ width: "max-content" }}
          />
        </Box>
        {shopCategories.length === 0 ? (
          <NoDataFound />
        ) : (
          <DataTable
            rows={shopCategories}
            columns={configJSON.shopCategoriesColumns}
            onViewClick={viewShopCategoryHandle}
            onEditClick={editShopCategoryHandle}
            onDeleteClick={deleteBtnClickHandle}
            isAction={true}
          />
        )}
      </DashboardPage>
    </Box>
  );
};

export default ShopCategoryPage;
