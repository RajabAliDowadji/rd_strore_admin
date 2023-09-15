import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import { GetProductColumns, Product } from "../../Modal/GetProducts.modal";
import { GET_PRODUCTS } from "../../Hooks/Saga/Constant";
import "./Products.web.css";

const configJSON = require("../../Constants/Products");

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<GetProductColumns[]>([]);

  useEffect(() => {
    dispatch({
      type: GET_PRODUCTS,
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
          is_published: product.is_published,
          is_vegetarian: product.is_vegetarian,
        })
      );
      setProducts(tempArr);
    }
  }, [state]);

  const addProductHandle = () => {
    navigate("/products/create");
  };
  const editProductHandle = (id: string) => {
    navigate(`/products/edit/${id}`);
  };
  const viewProductHandle = (id: string) => {
    navigate(`/products/view/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/products");
    setModalOpen(false);
    //TODO DELETE PRODUCT API CALL
  };
  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Product"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="product_mainContainer">
          <Box className="product_buttonContainer">
            <ActiveButton
              title={configJSON.productBtnTxt}
              disabled={false}
              onClick={addProductHandle}
            />
          </Box>
          <DataTable
            rows={products}
            columns={configJSON.productColumns}
            onViewClick={viewProductHandle}
            onEditClick={editProductHandle}
            onDeleteClick={deleteBtnClickHandle}
            isAction={true}
          />
        </Box>
      </Dashboard>
    </Box>
  );
};

export default Products;
