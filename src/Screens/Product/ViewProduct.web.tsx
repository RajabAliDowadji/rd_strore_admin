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
import {
  DELETE_PRODUCT,
  GET_PRODUCT_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import { useDispatch, useSelector } from "react-redux";
import { errorToaster, successToaster } from "../../Utils/common";
import "./Products.web.css";

const configJSON = require("../../Constants/Products");

const ViewProduct = () => {
  const initialData = useMemo(() => {
    return {
      _id: "",
      product_title: "",
      product_size: "",
      product_MRP_price: "",
      product_price: "",
      product_description: "",
      product_sub_category: "",
      product_brand: "",
      product_images: [
        { file_url: "" },
        { file_url: "" },
        { file_url: "" },
        { file_url: "" },
        { file_url: "" },
        { file_url: "" },
      ],
      search_name: "",
      is_vegetarian: "",
    };
  }, []);
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (id) {
      dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: { id: id },
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (
      state &&
      state.get_product_by_id &&
      state.get_product_by_id.product &&
      state.get_product_by_id.product !== null
    ) {
      let temp: any = initialData;
      temp._id = state.get_product_by_id.product._id;

      temp.product_title = state.get_product_by_id.product.product_title;
      temp.product_size = state.get_product_by_id.product.product_size;
      temp.product_MRP_price =
        state.get_product_by_id.product.product_MRP_price;
      temp.product_price = state.get_product_by_id.product.product_price;
      temp.product_description =
        state.get_product_by_id.product.product_description;
      temp.product_sub_category =
        state.get_product_by_id.product.product_sub_category.sub_category_name;
      temp.product_brand =
        state.get_product_by_id.product.product_brand.brand_name;
      temp.search_name = state.get_product_by_id.product.search_name;
      temp.product_images = state.get_product_by_id.product.product_images;
      temp.is_vegetarian = state.get_product_by_id.product.is_vegetarian;

      setFormData((prev: any) => ({
        ...prev,
        ...temp,
      }));
    }
  }, [initialData, state]);

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
      navigate("/products");
    } else if (state && state.delete_product && state.delete_product.isError) {
      errorToaster(state.get_product.message);
    }
  }, [dispatch, navigate, state]);

  const addProductHandle = () => {
    navigate("/products/create");
  };

  const editProductHandle = () => {
    navigate(`/products/edit/${id}`);
  };

  const deleteBtnClickHandle = () => {
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
          <Box>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Box className="product_textFieldContainer">
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
                  <Box className="product_textFieldContainer">
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
                  <Box className="product_textFieldContainer">
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
                  <Box className="product_textFieldContainer">
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
                  <Box className="product_textFieldContainer">
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
                <Grid item xs={4}>
                  <Box className="product_textFieldContainer">
                    <CustomTextField
                      id="product_brand"
                      type="text"
                      label="Product brand"
                      name="product_brand"
                      value={formData.product_brand}
                      disabled={true}
                    />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box className="product_textFieldContainer">
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
                  <Box className="product_textFieldContainer">
                    <CustomTextField
                      id="is_vegetarian"
                      type="text"
                      label="Is vegetarian"
                      name="is_vegetarian"
                      disabled={true}
                      value={formData.is_vegetarian ? "Yes" : "No"}
                    />
                  </Box>
                  <Box className="product_textFieldContainer">
                    <CustomTextField
                      id="search_name"
                      type="text"
                      label="Search name"
                      name="search_name"
                      disabled={true}
                      value={formData.search_name}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className="product_textFieldContainer">
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
          <Box className="product_buttonSubContainer">
            <ActiveButton
              title={configJSON.editBtnTxt}
              disabled={false}
              onClick={editProductHandle}
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
export default ViewProduct;
