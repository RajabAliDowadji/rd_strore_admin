import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../Dashboard/Dashboard.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import {
  ProductCategory,
  GetProductCategoriesColumns,
} from "../../Modal/GetProductCategories.modal";
import {
  DELETE_PRODUCT_CATEGORY,
  GET_PRODUCT_CATEGORIES,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import NoDataFound from "../../Ui/Data/NoDataFound.web";
import { errorToaster, successToaster } from "../../Utils/common";
import "./ProductCategories.web.css";

const configJSON = require("../../Constants/Products");

const ProductCategories = () => {
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
            type_name: productCategory.product_type.type_name,
            search_name: productCategory.search_name,
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
        payload: { state: "product_category" },
      });
    } else if (
      state &&
      state.delete_product_category &&
      state.delete_product_category.isError
    ) {
      errorToaster(state.delete_product_category.message);
    }
  }, [dispatch, navigate, state]);

  const addProductTypeHandle = () => {
    navigate("/product-categories/create");
  };
  const editProductTypeHandle = (id: string) => {
    navigate(`/product-categories/edit/${id}`);
  };
  const viewProductTypeClickHandle = (id: string) => {
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
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Product type"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="prodCategory_mainContainer">
          <Box className="prodCategory_buttonContainer">
            <ActiveButton
              title={configJSON.productCatBtnTxt}
              disabled={false}
              onClick={addProductTypeHandle}
            />
          </Box>
          {productCategories.length === 0 ? (
            <NoDataFound />
          ) : (
            <DataTable
              rows={productCategories}
              columns={configJSON.productCatColumns}
              onViewClick={viewProductTypeClickHandle}
              onEditClick={editProductTypeHandle}
              onDeleteClick={deleteBtnClickHandle}
              isAction={true}
            />
          )}
        </Box>
      </Dashboard>
    </Box>
  );
};

export default ProductCategories;
