import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import DashboardPage from "../DashboardPage/DashboardPage.web";
import {
  DELETE_PRODUCT_BRAND,
  GET_PRODUCT_BRAND_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import { errorToaster, successToaster } from "../../Utils/common";
import { GetProductBrandByIdResponse } from "../../Modal/GetProductBrandById.modal";
import "./ProductBrandPage.web.css";

const configJSON = require("../../Constants/Products");

const ViewProductBrandPage = () => {
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
      <DashboardPage>
        <DeleteModal
          open={modalOpen}
          title="Product Brand"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="prodbrandpage_mainContainer">
          <Box className="prodbrandpage_viewbuttonContainer">
            <ActiveButton
              title={configJSON.productBrandBtnTxt}
              disabled={false}
              onClick={addProductBrandHandle}
              style={{ width: "max-content" }}
            />
          </Box>
          <Box className="prodbrandpage_textFieldContainer">
            <CustomTextField
              id="_id"
              type="text"
              label="Id"
              name="_id"
              value={formData._id}
              disabled={true}
            />
          </Box>
          <Box className="prodbrandpage_textFieldContainer">
            <CustomTextField
              id="brand_name"
              type="text"
              label="Brand name"
              name="brand_name"
              value={formData.brand_name}
              disabled={true}
            />
          </Box>
          <Box className="prodbrandpage_buttonSubContainer">
            <ActiveButton
              title={configJSON.editBtnTxt}
              disabled={false}
              onClick={editProductBrandHandle}
              style={{ margin: "0px 15px 0px 0px" }}
            />
            <DeleteButton
              title={configJSON.deleteBtnTxt}
              disabled={false}
              onClick={deleteProductBrandHandle}
              style={{ margin: "0px 0px 0px 15px" }}
            />
          </Box>
        </Box>
      </DashboardPage>
    </Box>
  );
};
export default ViewProductBrandPage;
