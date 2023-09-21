import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../Dashboard/Dashboard.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import {
  ProductBrand,
  ProductBrandColumns,
} from "../../Modal/GetProductBrands.modal";
import {
  DELETE_PRODUCT_BRAND,
  GET_PRODUCT_BRANDS,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import NoDataFound from "../../Ui/Data/NoDataFound.web";
import "./ProductBrands.web.css";
import { errorToaster, successToaster } from "../../Utils/common";

const configJSON = require("../../Constants/Products");

const ProductBrands = () => {
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
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Product brand"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="prodBrand_mainContainer">
          <Box className="prodBrand_buttonContainer">
            <ActiveButton
              title={configJSON.productBrandBtnTxt}
              disabled={false}
              onClick={addProductBrandHandle}
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
        </Box>
      </Dashboard>
    </Box>
  );
};

export default ProductBrands;
