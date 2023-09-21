import React, { useEffect, useMemo, useState } from "react";
import { Box, Divider, Grid, Typography } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_PRODUCT_BRAND,
  GET_PRODUCT_BRAND_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import { GetProductBrandByIdResponse } from "../../Modal/GetProductBrandById.modal";
import { errorToaster, successToaster } from "../../Utils/common";
import "./ProductBrands.web.css";

const configJSON = require("../../Constants/Products");

const ViewProductBrand = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const initialData = useMemo(() => {
    return {
      _id: "",
      brand_name: "",
      sub_category_ids: {
        sub_category: [],
      },
    };
  }, []);

  const [formData, setFormData] = useState<any>(initialData);

  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_BRAND_BY_ID,
      payload: { id: id },
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (
      state &&
      state.get_product_brand_by_id &&
      state.get_product_brand_by_id.productBrand &&
      state.get_product_brand_by_id.productBrand !== null
    ) {
      let temp: GetProductBrandByIdResponse = initialData;
      temp._id = state.get_product_brand_by_id.productBrand._id;
      temp.brand_name = state.get_product_brand_by_id.productBrand.brand_name;
      temp.sub_category_ids =
        state.get_product_brand_by_id.productBrand.sub_category_ids;
      setFormData((prev: GetProductBrandByIdResponse) => ({
        ...prev,
        ...temp,
      }));
    }
  }, [initialData, state]);

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
      navigate("/product-brands");
    } else if (
      state &&
      state.delete_product_brand &&
      state.delete_product_brand.isError
    ) {
      errorToaster(state.delete_product_brand.message);
    }
  }, [dispatch, navigate, state]);

  const addProductBrandHandle = () => {
    dispatch({
      type: RESET_STATE,
      payload: { state: "product-brands" },
    });
    navigate("/product-brands/create");
  };

  const editProductBrandHandle = () => {
    navigate(`/product-brands/edit/${id}`);
  };

  const deleteProductBrandHandle = () => {
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
              title={configJSON.productTypeBtnTxt}
              disabled={false}
              onClick={addProductBrandHandle}
            />
          </Box>
          <Box>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Box className="prodBrand_textFieldContainer">
                    <CustomTextField
                      id="_id"
                      type="text"
                      label="Id"
                      name="_id"
                      value={formData._id}
                      disabled={true}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="prodBrand_textFieldContainer">
                    <CustomTextField
                      id="brand_name"
                      type="text"
                      label="Brand name"
                      name="brand_name"
                      value={formData.brand_name}
                      disabled={true}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Divider className="prodBrand_textFieldContainer" />
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography className="prodBrand_titleText">
                    Product Sub-Categories
                  </Typography>
                </Grid>
                {formData.sub_category_ids.sub_category.map((data: any) => (
                  <>
                    <Grid item xs={4} key={data._id}>
                      <Box className="prodBrand_textFieldContainer">
                        <CustomTextField
                          id="_id"
                          type="text"
                          label="Sub-category Id"
                          name="_id"
                          value={data._id}
                          disabled={true}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box className="prodBrand_textFieldContainer">
                        <CustomTextField
                          id="sub_category_name"
                          type="text"
                          label="Sub-category name"
                          name="sub_category_name"
                          value={data.sub_category_name}
                          disabled={true}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box className="prodBrand_textFieldContainer">
                        <CustomTextField
                          id="category_name"
                          type="text"
                          label="Category name"
                          name="category_name"
                          value={data.product_category.category_name}
                          disabled={true}
                        />
                      </Box>
                    </Grid>
                  </>
                ))}
              </Grid>
            </Box>
          </Box>
          <Box className="prodBrand_buttonSubContainer">
            <ActiveButton
              title={configJSON.editBtnTxt}
              disabled={false}
              onClick={editProductBrandHandle}
              style={{ width: "205px", margin: "0px 15px 0px 0px" }}
            />
            <DeleteButton
              title={configJSON.deleteBtnTxt}
              disabled={false}
              onClick={deleteProductBrandHandle}
              style={{ width: "205px", margin: "0px 0px 0px 15px" }}
            />
          </Box>
        </Box>
      </Dashboard>
    </Box>
  );
};
export default ViewProductBrand;
