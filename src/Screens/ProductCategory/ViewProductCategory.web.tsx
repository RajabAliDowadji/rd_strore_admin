import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { useNavigate, useParams } from "react-router-dom";
import {
  DELETE_PRODUCT_CATEGORY,
  GET_PRODUCT_CATEGORY_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import { useDispatch, useSelector } from "react-redux";
import { GetProductCategoryByIdResponse } from "../../Modal/GetProductCategoryById.modal";
import { errorToaster, successToaster } from "../../Utils/common";
import "./ProductCategories.web.css";

const configJSON = require("../../Constants/Products");

const ViewProductCategory = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const initialData = useMemo(() => {
    return {
      _id: "",
      category_name: "",
      product_type: "",
      search_name: "",
    };
  }, []);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>(initialData);

  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_CATEGORY_BY_ID,
      payload: { id: id },
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (
      state &&
      state.get_product_category_by_id &&
      state.get_product_category_by_id.productCategory &&
      state.get_product_category_by_id.productCategory !== null
    ) {
      let temp: GetProductCategoryByIdResponse = initialData;
      temp._id = state.get_product_category_by_id.productCategory._id;
      temp.category_name =
        state.get_product_category_by_id.productCategory.category_name;
      temp.product_type =
        state.get_product_category_by_id.productCategory.product_type.type_name;
      temp.search_name =
        state.get_product_category_by_id.productCategory.search_name;
      setFormData((prev: GetProductCategoryByIdResponse) => ({
        ...prev,
        ...temp,
      }));
    }
  }, [initialData, state]);

  useEffect(() => {
    if (
      state &&
      state.delete_product_category &&
      !state.delete_product_category.isError &&
      state.delete_product_category.message !== ""
    ) {
      successToaster(state.delete_product_category.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "product_category" },
      });
      navigate("/product-categories");
    } else if (
      state &&
      state.delete_product_category &&
      state.delete_product_category.isError
    ) {
      errorToaster(state.delete_product_category.message);
    }
  }, [dispatch, navigate, state]);

  const addProductTypeHandle = () => {
    navigate("/product-categories/create");
  };
  const editProductTypeHandle = () => {
    navigate(`/product-categories/edit/${id}`);
  };
  const deleteProductTypeHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    dispatch({
      type: DELETE_PRODUCT_CATEGORY,
      payload: { id: id },
    });
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
        <Box className="prodCategory_mainContainer">
          <Box className="prodCategory_buttonContainer">
            <ActiveButton
              title={configJSON.productTypeBtnTxt}
              disabled={false}
              onClick={addProductTypeHandle}
            />
          </Box>
          <Box>
            <Box className="prodCategory_textFieldContainer">
              <CustomTextField
                id="_id"
                type="text"
                label="Id"
                name="_id"
                value={formData._id}
                disabled={true}
              />
            </Box>
            <Box className="prodCategory_textFieldContainer">
              <CustomTextField
                id="category_name"
                type="text"
                label="Category name"
                name="category_name"
                value={formData.category_name}
                disabled={true}
              />
            </Box>
            <Box className="prodCategory_textFieldContainer">
              <CustomTextField
                id="product_type"
                type="text"
                label="product type"
                name="product_type"
                value={formData.product_type}
                disabled={true}
              />
            </Box>
            <Box className="prodCategory_textFieldContainer">
              <CustomTextField
                id="search_name"
                type="text"
                label="Search name"
                name="search_name"
                value={formData.search_name}
                disabled={true}
              />
            </Box>
          </Box>
          <Box className="prodCategory_buttonSubContainer">
            <ActiveButton
              title={configJSON.editBtnTxt}
              disabled={false}
              onClick={editProductTypeHandle}
              style={{ width: "205px", margin: "0px 15px 0px 0px" }}
            />
            <DeleteButton
              title={configJSON.deleteBtnTxt}
              disabled={false}
              onClick={deleteProductTypeHandle}
              style={{ width: "205px", margin: "0px 0px 0px 15px" }}
            />
          </Box>
        </Box>
      </Dashboard>
    </Box>
  );
};
export default ViewProductCategory;
