import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../Dashboard/Dashboard.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import {
  GetProductSubCategoriesColumns,
  ProductSubCategory,
} from "../../Modal/GetProductSubCategories.modal";
import { GET_PRODUCT_SUB_CATEGORIES } from "../../Hooks/Saga/Constant";
import "./ProductSubCategories.web.css";

const configJSON = require("../../Constants/Products");

const ProductSubCategories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
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
            search_name: productCategory.search_name,
          })
      );
      setProductSubCategories(tempArr);
    }
  }, [state]);
  const addProductTypeHandle = () => {
    navigate("/product-sub-categories/create");
  };
  const editProductTypeHandle = (id: string) => {
    navigate(`/product-sub-categories/edit/${id}`);
  };
  const viewProductTypeClickHandle = (id: string) => {
    navigate(`/product-sub-categories/view/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/product-sub-categories");
    setModalOpen(false);
    //TODO DELETE PRODUCT TYPE API CALL
  };
  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Product sub-category"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="prodSubCategory_mainContainer">
          <Box className="prodSubCategory_buttonContainer">
            <ActiveButton
              title={configJSON.productSubCatBtnTxt}
              disabled={false}
              onClick={addProductTypeHandle}
            />
          </Box>
          <DataTable
            rows={productSubCategories}
            columns={configJSON.productSubCatColumns}
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

export default ProductSubCategories;
