import React, { useEffect, useMemo, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { useNavigate, useParams } from "react-router-dom";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import ViewMultiImages from "../../Ui/Image/ViewMultiImages.web";
import { noimage_placeholder } from "./assets";
import { useDispatch, useSelector } from "react-redux";
import { errorToaster, successToaster } from "../../Utils/common";
import {
  DELETE_PRODUCT_INVENTORY,
  GET_PRODUCT_INVENTORY_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import "./ProductInventories.web.css";
import { GetProductInventoryByIdResponse } from "../../Modal/GetProductInventoryById.modal";

const configJSON = require("../../Constants/Products");

const ViewProductInventory = () => {
  let { id } = useParams();
  const initialData = useMemo(() => {
    return {
      quantity: "",
      product_title: "",
      product_size: "",
      product_MRP_price: "",
      product_price: "",
      product_description: "",
      product_sub_category: "",
      product_brand: "",
      is_vegetarian: false,
      product_images: [
        { file_url: "" },
        { file_url: "" },
        { file_url: "" },
        { file_url: "" },
        { file_url: "" },
        { file_url: "" },
      ],
    };
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] =
    useState<GetProductInventoryByIdResponse>(initialData);

  useEffect(() => {
    if (id) {
      dispatch({
        type: GET_PRODUCT_INVENTORY_BY_ID,
        payload: { id: id },
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (
      state &&
      state.get_product_inventory_by_id &&
      state.get_product_inventory_by_id.productInventory &&
      state.get_product_inventory_by_id.productInventory !== null
    ) {
      let temp: GetProductInventoryByIdResponse = initialData;
      const productInventory =
        state.get_product_inventory_by_id.productInventory;
      temp._id = productInventory._id;
      temp.quantity = productInventory.quantity;
      temp.product_title = productInventory.product.product_title;
      temp.product_size = productInventory.product.product_size;

      temp.product_MRP_price = productInventory.product.product_MRP_price;
      temp.product_price = productInventory.product.product_price;
      temp.product_description = productInventory.product.product_description;
      temp.product_sub_category =
        productInventory.product.product_sub_category.sub_category_name;
      temp.product_brand = productInventory.product.product_brand.brand_name;
      temp.product_images = productInventory.product.product_images;
      temp.is_vegetarian = productInventory.product.is_vegetarian;

      setFormData((prev: GetProductInventoryByIdResponse) => ({
        ...prev,
        ...temp,
      }));
    }
  }, [initialData, state]);

  useEffect(() => {
    if (
      state &&
      state.delete_product_inventory &&
      !state.delete_product_inventory.isError &&
      state.delete_product_inventory.message !== ""
    ) {
      successToaster(state.delete_product_inventory.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "product-inventories" },
      });
      navigate("/product-inventories");
    } else if (
      state &&
      state.delete_product_inventory &&
      state.delete_product_inventory.isError
    ) {
      errorToaster(state.delete_product_inventory.message);
    }
  }, [dispatch, navigate, state]);

  const addProductInvHandle = () => {
    navigate("/product-inventories/create");
  };
  const editProductInvHandle = () => {
    navigate(`/product-inventories/edit/${id}`);
  };

  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };

  const modalHandleClose = () => {
    setModalOpen(false);
  };

  const onDeleteConfirmHandle = () => {
    dispatch({
      type: DELETE_PRODUCT_INVENTORY,
      payload: { id: id },
    });
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
        <Box className="productInventory_mainContainer">
          <Box className="productInventory_buttonContainer">
            <ActiveButton
              title={configJSON.productInvBtnTxt}
              disabled={false}
              onClick={addProductInvHandle}
            />
          </Box>
          <Box>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Box className="productInventory_textFieldContainer">
                    <CustomTextField
                      id="product_title"
                      type="text"
                      label="Product title"
                      name="product_title"
                      value={formData.product_title}
                      disabled={true}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="productInventory_textFieldContainer">
                    <CustomTextField
                      id="quantity"
                      type="text"
                      label="Product quantity"
                      name="quantity"
                      value={formData.quantity.toString()}
                      disabled={true}
                    />
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Box className="productInventory_textFieldContainer">
                    <CustomTextField
                      id="product_size"
                      type="text"
                      label="Product size"
                      name="product_size"
                      value={formData.product_size}
                      disabled={true}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="productInventory_textFieldContainer">
                    <CustomTextField
                      id="product_MRP_price"
                      type="text"
                      label="Product MRP price"
                      name="product_MRP_price"
                      value={formData.product_MRP_price.toString()}
                      disabled={true}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="productInventory_textFieldContainer">
                    <CustomTextField
                      id="product_price"
                      type="text"
                      label="Product price"
                      name="product_price"
                      disabled={true}
                      value={formData.product_price.toString()}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="productInventory_textFieldContainer">
                    <CustomTextField
                      id="product_sub_category"
                      type="text"
                      label="Product sub-category"
                      name="product_sub_category"
                      disabled={true}
                      value={formData.product_sub_category}
                    />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box className="productInventory_textFieldContainer">
                    <CustomTextField
                      id="product_description"
                      type="text"
                      label="Product Description"
                      name="product_description"
                      disabled={true}
                      multiline={true}
                      value={formData.product_description}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="productInventory_textFieldContainer">
                    <CustomTextField
                      id="product_brand"
                      type="text"
                      label="Product brand"
                      name="product_brand"
                      value={formData.product_brand}
                      disabled={true}
                    />
                  </Box>
                  <Box className="productInventory_textFieldContainer">
                    <CustomTextField
                      id="is_vegetarian"
                      type="text"
                      label="Is vegetarian"
                      name="is_vegetarian"
                      disabled={true}
                      value={formData.is_vegetarian ? "Yes" : "No"}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className="productInventory_textFieldContainer">
                    <ViewMultiImages
                      noimage_placeHolder={noimage_placeholder}
                      title={"Product images"}
                      selectedImage={formData.product_images}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box className="productInventory_buttonSubContainer">
            <ActiveButton
              title={configJSON.editBtnTxt}
              disabled={false}
              onClick={editProductInvHandle}
              style={{ width: "205px", margin: "0px 15px 0px 0px" }}
            />
            <DeleteButton
              title={configJSON.deleteBtnTxt}
              disabled={false}
              onClick={deleteBtnClickHandle}
              style={{ width: "205px", margin: "0px 0px 0px 15px" }}
            />
          </Box>
        </Box>
      </Dashboard>
    </Box>
  );
};
export default ViewProductInventory;
