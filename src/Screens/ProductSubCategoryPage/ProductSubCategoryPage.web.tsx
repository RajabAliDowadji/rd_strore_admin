import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import {
  DELETE_PRODUCT_SUB_CATEGORY,
  GET_PRODUCT_SUB_CATEGORIES,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { errorToaster, successToaster } from "../../Utils/common";
import NoDataFound from "../../Ui/Data/NoDataFound.web";
import DashboardPage from "../DashboardPage/DashboardPage.web";
import {
  GetProductSubCategoriesColumns,
  ProductSubCategory,
} from "../../Modal/GetProductSubCategories.modal";
import "./ProductSubCategoryPage.web.css";

const configJSON = require("../../Constants/Products");

const ProductSubCategotyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [id, setId] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [productSubCategories, setProductSubCategories] = useState<
    GetProductSubCategoriesColumns[]
  >([]);

  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_SUB_CATEGORIES,
    });
  }, [dispatch]);

  useEffect(() => {
    if (
      state &&
      state.get_product_sub_categories &&
      state.get_product_sub_categories.productSubCategories &&
      state.get_product_sub_categories.productSubCategories.length !== 0
    ) {
      let tempArr: GetProductSubCategoriesColumns[] = [];
      state.get_product_sub_categories.productSubCategories.map(
        (productCategory: ProductSubCategory) =>
          tempArr.push({
            _id: productCategory._id,
            sub_category_name: productCategory.sub_category_name,
            category_name: productCategory.product_category.category_name,
          })
      );
      setProductSubCategories(tempArr);
    } else if (
      state &&
      state.get_product_sub_categories &&
      state.get_product_sub_categories.productSubCategories &&
      state.get_product_sub_categories.productSubCategories.length === 0
    ) {
      setProductSubCategories([]);
    }
  }, [state]);

  useEffect(() => {
    if (
      state &&
      state.delete_product_sub_category &&
      !state.delete_product_sub_category.isError &&
      state.delete_product_sub_category.message !== ""
    ) {
      successToaster(state.delete_product_sub_category.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "product-sub-categories" },
      });
    } else if (
      state &&
      state.delete_product_sub_category &&
      state.delete_product_sub_category.isError
    ) {
      errorToaster(state.delete_product_sub_category.message);
    }
  }, [dispatch, navigate, state]);

  const addProductSubCatHandle = () => {
    navigate("/product-sub-categories/create");
  };

  const editProductSubCatHandle = (id: string) => {
    navigate(`/product-sub-categories/edit/${id}`);
  };

  const viewProductSubCatClickHandle = (id: string) => {
    navigate(`/product-sub-categories/view/${id}`);
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
      type: DELETE_PRODUCT_SUB_CATEGORY,
      payload: { id: id },
    });
    setModalOpen(false);
  };

  return (
    <Box>
      <DashboardPage>
        <DeleteModal
          open={modalOpen}
          title="Product Sub-Category"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="prodsubcatpage_buttonContainer">
          <Typography className="prodsubcatpage_maintitleText">
            Product Sub-Category
          </Typography>
          <ActiveButton
            title={configJSON.productSubCatBtnTxt}
            disabled={false}
            onClick={addProductSubCatHandle}
            style={{ width: "max-content" }}
          />
        </Box>
        {productSubCategories.length === 0 ? (
          <NoDataFound />
        ) : (
          <DataTable
            rows={productSubCategories}
            columns={configJSON.productSubCatColumns}
            onViewClick={viewProductSubCatClickHandle}
            onEditClick={editProductSubCatHandle}
            onDeleteClick={deleteBtnClickHandle}
            isAction={true}
          />
        )}
      </DashboardPage>
    </Box>
  );
};

export default ProductSubCategotyPage;
