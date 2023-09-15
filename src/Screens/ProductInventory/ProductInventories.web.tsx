import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../Dashboard/Dashboard.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import {
  GetProductInventoriesColumns,
  ProductInventory,
} from "../../Modal/GetProductInventories.modal";
import { GET_PRODUCT_INVENTORIES } from "../../Hooks/Saga/Constant";
import "./ProductInventories.web.css";

const configJSON = require("../../Constants/Products");

const ProductInventories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [productInventories, setProductInventories] = useState<
    GetProductInventoriesColumns[]
  >([]);
  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_INVENTORIES,
    });
  }, [dispatch]);

  useEffect(() => {
    if (
      state &&
      state.get_product_inventories &&
      state.get_product_inventories.productInventories &&
      state.get_product_inventories.productInventories.length !== 0
    ) {
      let tempArr: GetProductInventoriesColumns[] = [];
      state.get_product_inventories.productInventories.map(
        (productInventory: ProductInventory) =>
          tempArr.push({
            _id: productInventory._id,
            quantity: productInventory.quantity,
            product_title: productInventory.product.product_title,
            product_size: productInventory.product.product_size,
            product_MRP_price: productInventory.product.product_MRP_price,
            product_price: productInventory.product.product_price,
            product_sub_category:
              productInventory.product.product_sub_category.sub_category_name,
            product_brand: productInventory.product.product_brand.brand_name,
            is_vegetarian: productInventory.product.is_vegetarian,
          })
      );
      setProductInventories(tempArr);
    }
  }, [state]);

  const addProductiInvHandle = () => {
    navigate("/product-inventories/create");
  };
  const editProductInvHandle = (id: string) => {
    navigate(`/product-inventories/edit/${id}`);
  };
  const viewProductInvHandle = (id: string) => {
    navigate(`/product-inventories/view/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/product-inventories");
    setModalOpen(false);
    //TODO DELETE PRODUCT INVENTORY API CALL
  };
  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Product Inventory"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="productInventory_mainContainer">
          <Box className="productInventory_buttonContainer">
            <ActiveButton
              title={configJSON.productInvBtnTxt}
              disabled={false}
              onClick={addProductiInvHandle}
            />
          </Box>
          <DataTable
            rows={productInventories}
            columns={configJSON.productInvColumns}
            onViewClick={viewProductInvHandle}
            onEditClick={editProductInvHandle}
            onDeleteClick={deleteBtnClickHandle}
            isAction={true}
          />
        </Box>
      </Dashboard>
    </Box>
  );
};

export default ProductInventories;
