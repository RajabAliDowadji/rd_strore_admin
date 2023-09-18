import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../Dashboard/Dashboard.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import { ProductType } from "../../Modal/GetProductTypes.modal";
import { GET_PRODUCT_TYPES } from "../../Hooks/Saga/Constant";
import NoDataFound from "../../Ui/Data/NoDataFound.web";
import "./ProductTypes.web.css";

const configJSON = require("../../Constants/Products");

const ProductTypes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_TYPES,
    });
  }, [dispatch]);
  useEffect(() => {
    if (
      state &&
      state.get_product_types &&
      state.get_product_types.productTypes &&
      state.get_product_types.productTypes.length !== 0
    ) {
      let tempArr: ProductType[] = [];
      state.get_product_types.productTypes.map((productType: ProductType) =>
        tempArr.push({
          _id: productType._id,
          type_name: productType.type_name,
          search_name: productType.search_name,
        })
      );
      setProductTypes(tempArr);
    }
  }, [state]);
  const addProductTypeHandle = () => {
    navigate("/product-types/create");
  };
  const editProductTypeHandle = (id: string) => {
    navigate(`/product-types/edit/${id}`);
  };
  const viewProductTypeClickHandle = (id: string) => {
    navigate(`/product-types/view/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/product-types");
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
        <Box className="productType_mainContainer">
          <Box className="productType_buttonContainer">
            <ActiveButton
              title={configJSON.productTypeBtnTxt}
              disabled={false}
              onClick={addProductTypeHandle}
            />
          </Box>
          {productTypes.length === 0 ? (
            <NoDataFound />
          ) : (
            <DataTable
              rows={productTypes}
              columns={configJSON.productTypeColumns}
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

export default ProductTypes;
