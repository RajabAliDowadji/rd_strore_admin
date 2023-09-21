import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../Dashboard/Dashboard.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import { ShopCategory } from "../../Modal/GetShopCategories.modal";
import {
  DELETE_SHOP_CATEGORY,
  GET_SHOP_CATEGORIES,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import "./ShopCategories.web.css";
import NoDataFound from "../../Ui/Data/NoDataFound.web";
import { errorToaster, successToaster } from "../../Utils/common";

const configJSON = require("../../Constants/Shop");

const ShopCategories = () => {
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
        </Box>
      </Dashboard>
    </Box>
  );
};

export default ShopCategories;
