import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import {
  DELETE_PRODUCT,
  GET_PRODUCTS,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { errorToaster, successToaster } from "../../Utils/common";
import NoDataFound from "../../Ui/Data/NoDataFound.web";
import DashboardPage from "../DashboardPage/DashboardPage.web";
import { GetProductColumns, Product } from "../../Modal/GetProducts.modal";
import "./ProductPage.web.css";

const configJSON = require("../../Constants/Products");

const ProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [products, setProducts] = useState<GetProductColumns[]>([]);

  useEffect(() => {
    dispatch({
      type: GET_PRODUCTS,
      payload: { brand_name: "", sub_category_name: "" },
    });
  }, [dispatch]);

  useEffect(() => {
    if (
      state &&
      state.get_products &&
      state.get_products.products &&
      state.get_products.products.length !== 0
    ) {
      let tempArr: GetProductColumns[] = [];
      state.get_products.products.map((product: Product) =>
        tempArr.push({
          _id: product._id,
          product_title: product.product_title,
          product_size: product.product_size,
          product_MRP_price: product.product_MRP_price,
          product_price: product.product_price,
          sub_category_name: product.product_sub_category.sub_category_name,
          brand_name: product.product_brand.brand_name,
          is_vegetarian: product.is_vegetarian,
          is_published: product.is_published,
        })
      );
      setProducts(tempArr);
    } else if (
      state &&
      state.get_products &&
      state.get_products.products &&
      state.get_products.products.length === 0
    ) {
      setProducts([]);
    }
  }, [state]);

  useEffect(() => {
    if (
      state &&
      state.delete_product &&
      !state.delete_product.isError &&
      state.delete_product.message !== ""
    ) {
      successToaster(state.delete_product.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "products" },
      });
    } else if (state && state.delete_product && state.delete_product.isError) {
      errorToaster(state.get_product.message);
    }
  }, [dispatch, navigate, state]);

  const addProductHandle = () => {
    navigate("/products/create");
  };

  const editProductHandle = (id: string) => {
    navigate(`/products/edit/${id}`);
  };

  const viewProductHandle = (id: string) => {
    navigate(`/products/view/${id}`);
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
      type: DELETE_PRODUCT,
      payload: { id: id },
    });
    setModalOpen(false);
  };

  return (
    <Box>
      <DashboardPage>
        <DeleteModal
          open={modalOpen}
          title="Product"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="prodpage_buttonContainer">
          <Typography className="prodpage_maintitleText">Product</Typography>
          <ActiveButton
            title={configJSON.productBtnTxt}
            disabled={false}
            onClick={addProductHandle}
            style={{ width: "max-content" }}
          />
        </Box>
        {products.length === 0 ? (
          <NoDataFound />
        ) : (
          <DataTable
            rows={products}
            columns={configJSON.productColumns}
            onViewClick={viewProductHandle}
            onEditClick={editProductHandle}
            onDeleteClick={deleteBtnClickHandle}
            isAction={true}
          />
        )}
      </DashboardPage>
    </Box>
  );
};

export default ProductPage;
