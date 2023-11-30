import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import {
  DELETE_PRODUCT_BRAND,
  GET_PRODUCT_BRANDS,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { errorToaster, successToaster } from "../../Utils/common";
import NoDataFound from "../../Ui/Data/NoDataFound.web";
import DashboardPage from "../DashboardPage/DashboardPage.web";
import {
  ProductBrandColumns,
  ProductBrand,
} from "../../Modal/GetProductBrands.modal";
import "./ProductBrandPage.web.css";

const configJSON = require("../../Constants/Products");

const ProductBrandPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [id, setId] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [productBrands, setProductBrands] = useState<ProductBrandColumns[]>([]);
  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_BRANDS,
    });
  }, [dispatch]);

  useEffect(() => {
    if (
      state &&
      state.get_product_brands &&
      state.get_product_brands.productBrands &&
      state.get_product_brands.productBrands.length !== 0
    ) {
      let tempArr: ProductBrandColumns[] = [];
      state.get_product_brands.productBrands.map((productBrand: ProductBrand) =>
        tempArr.push({
          _id: productBrand._id,
          brand_name: productBrand.brand_name,
        })
      );
      setProductBrands(tempArr);
    } else if (
      state &&
      state.get_product_brands &&
      state.get_product_brands.productBrands &&
      state.get_product_brands.productBrands.length === 0
    ) {
      setProductBrands([]);
    }
  }, [state]);

  useEffect(() => {
    if (
      state &&
      state.delete_product_brand &&
      !state.delete_product_brand.isError &&
      state.delete_product_brand.message !== ""
    ) {
      successToaster(state.delete_product_brand.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "product-brands" },
      });
    } else if (
      state &&
      state.delete_product_brand &&
      state.delete_product_brand.isError
    ) {
      errorToaster(state.delete_product_brand.message);
    }
  }, [dispatch, navigate, state]);

  const addProductBrandHandle = () => {
    navigate("/product-brands/create");
  };

  const editProductBrandHandle = (id: string) => {
    navigate(`/product-brands/edit/${id}`);
  };

  const viewProductBrandClickHandle = (id: string) => {
    navigate(`/product-brands/view/${id}`);
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
      type: DELETE_PRODUCT_BRAND,
      payload: { id: id },
    });
    setModalOpen(false);
  };

  return (
    <Box>
      <DashboardPage>
        <DeleteModal
          open={modalOpen}
          title="Product Brand"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="prodbrandpage_buttonContainer">
          <Typography className="prodbrandpage_maintitleText">
            Product Brand
          </Typography>
          <ActiveButton
            title={configJSON.productBrandBtnTxt}
            disabled={false}
            onClick={addProductBrandHandle}
            style={{ width: "max-content" }}
          />
        </Box>
        {productBrands.length === 0 ? (
          <NoDataFound />
        ) : (
          <DataTable
            rows={productBrands}
            columns={configJSON.productBrandColumns}
            onViewClick={viewProductBrandClickHandle}
            onEditClick={editProductBrandHandle}
            onDeleteClick={deleteBtnClickHandle}
            isAction={true}
          />
        )}
      </DashboardPage>
    </Box>
  );
};

export default ProductBrandPage;
