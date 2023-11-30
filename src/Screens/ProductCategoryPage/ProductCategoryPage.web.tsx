import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import {
  DELETE_PRODUCT_CATEGORY,
  GET_PRODUCT_CATEGORIES,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { errorToaster, successToaster } from "../../Utils/common";
import NoDataFound from "../../Ui/Data/NoDataFound.web";
import DashboardPage from "../DashboardPage/DashboardPage.web";
import {
  GetProductCategoriesColumns,
  ProductCategory,
} from "../../Modal/GetProductCategories.modal";
import "./ProductCategoryPage.web.css";

const configJSON = require("../../Constants/Products");

const ProductCategoryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [productCategories, setProductCategories] = useState<
    GetProductCategoriesColumns[]
  >([]);
  const [id, setId] = useState<string>("");
  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_CATEGORIES,
    });
  }, [dispatch]);

  useEffect(() => {
    if (
      state &&
      state.get_product_categories &&
      state.get_product_categories.productCategories &&
      state.get_product_categories.productCategories.length !== 0
    ) {
      let tempArr: GetProductCategoriesColumns[] = [];
      state.get_product_categories.productCategories.map(
        (productCategory: ProductCategory) =>
          tempArr.push({
            _id: productCategory._id,
            category_name: productCategory.category_name,
          })
      );
      setProductCategories(tempArr);
    } else if (
      state &&
      state.get_product_categories &&
      state.get_product_categories.productCategories &&
      state.get_product_categories.productCategories.length === 0
    ) {
      setProductCategories([]);
    }
  }, [state]);

  useEffect(() => {
    if (
      state &&
      state.delete_product_category &&
      !state.delete_product_category.isError &&
      state.delete_product_category.message !== ""
    ) {
      successToaster(state.delete_product_category.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "product-categories" },
      });
    } else if (
      state &&
      state.delete_product_category &&
      state.delete_product_category.isError
    ) {
      errorToaster(state.delete_product_category.message);
    }
  }, [dispatch, navigate, state]);

  const addProductCatHandle = () => {
    navigate("/product-categories/create");
  };

  const editProductCatHandle = (id: string) => {
    navigate(`/product-categories/edit/${id}`);
  };

  const viewProductCatClickHandle = (id: string) => {
    navigate(`/product-categories/view/${id}`);
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
      type: DELETE_PRODUCT_CATEGORY,
      payload: { id: id },
    });
    setModalOpen(false);
  };

  return (
    <Box>
      <DashboardPage>
        <DeleteModal
          open={modalOpen}
          title="Product Category"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="prodcatpage_buttonContainer">
          <Typography className="prodcatpage_maintitleText">
            Product Category
          </Typography>
          <ActiveButton
            title={configJSON.productCatBtnTxt}
            disabled={false}
            onClick={addProductCatHandle}
            style={{ width: "max-content" }}
          />
        </Box>
        {productCategories.length === 0 ? (
          <NoDataFound />
        ) : (
          <DataTable
            rows={productCategories}
            columns={configJSON.productCatColumns}
            onViewClick={viewProductCatClickHandle}
            onEditClick={editProductCatHandle}
            onDeleteClick={deleteBtnClickHandle}
            isAction={true}
          />
        )}
      </DashboardPage>
    </Box>
  );
};

export default ProductCategoryPage;
