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
import { GET_PRODUCT_CATEGORIES } from "../../Hooks/Saga/Constant";
import NoDataFound from "../../Ui/Data/NoDataFound.web";
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
    }
  }, [state]);
  const addProductTypeHandle = () => {
    navigate("/product-categories/create");
  };
  const editProductTypeHandle = (id: string) => {
    navigate(`/product-categories/edit/${id}`);
  };
  const viewProductTypeClickHandle = (id: string) => {
    navigate(`/product-categories/view/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/product-categories");
    setModalOpen(false);
    //TODO DELETE PRODUCT TYPE API CALL
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
