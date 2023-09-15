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
import { GET_PRODUCT_BRANDS } from "../../Hooks/Saga/Constant";
import "./ProductBrands.web.css";

const configJSON = require("../../Constants/Products");

const ProductBrands = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
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
    }
  }, [state]);
  const addProductBrandHandle = () => {
    navigate("/product-brands/create");
  };
  const editProductBrandHandle = (id: string) => {
    navigate(`/product-brands/edit/${id}`);
  };
  const viewProductBrandClickHandle = (id: string) => {
    navigate(`/product-brands/view/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/product-brands");
    setModalOpen(false);
    //TODO DELETE PRODUCT TYPE API CALL
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
          <DataTable
            rows={productBrands}
            columns={configJSON.productBrandColumns}
            onViewClick={viewProductBrandClickHandle}
            onEditClick={editProductBrandHandle}
            onDeleteClick={deleteBtnClickHandle}
            isAction={true}
          />
        </Box>
      </Dashboard>
    </Box>
  );
};

export default ProductBrands;
