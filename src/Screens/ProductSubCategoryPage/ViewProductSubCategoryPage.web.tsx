import React, { useEffect, useMemo, useState } from "react";
import { Box, Divider, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import DashboardPage from "../DashboardPage/DashboardPage.web";
import {
  DELETE_PRODUCT_SUB_CATEGORY,
  GET_PRODUCT_SUB_CATEGORY_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import { errorToaster, successToaster } from "../../Utils/common";
import ImageUpload from "../../Ui/Image/ImageUpload.web";
import { profile_placeHolder } from "../ShopPage/assets";
import { GetProductSubCategoryByIdResponse } from "../../Modal/GetProductSubCategoryById.modal";
import "./ProductSubCategoryPage.web.css";

const configJSON = require("../../Constants/Products");

const ViewProductSubCategoryPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const initialData = useMemo(() => {
    return {
      _id: "",
      sub_category_name: "",
      product_category: "",
      sub_category_image: "",
    };
  }, []);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>(initialData);

  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_SUB_CATEGORY_BY_ID,
      payload: { id: id },
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (
      state &&
      state.get_product_sub_category_by_id &&
      state.get_product_sub_category_by_id.productSubCategory &&
      state.get_product_sub_category_by_id.productSubCategory !== null
    ) {
      let temp: GetProductSubCategoryByIdResponse = initialData;
      temp._id = state.get_product_sub_category_by_id.productSubCategory._id;
      temp.sub_category_name =
        state.get_product_sub_category_by_id.productSubCategory.sub_category_name;
      temp.product_category =
        state.get_product_sub_category_by_id.productSubCategory.product_category.category_name;
      temp.sub_category_image =
        state.get_product_sub_category_by_id.productSubCategory.sub_category_image.file_url;
      setFormData((prev: GetProductSubCategoryByIdResponse) => ({
        ...prev,
        ...temp,
      }));
    }
  }, [initialData, state]);

  useEffect(() => {
    if (
      state &&
      state.delete_product_sub_category &&
      !state.delete_product_sub_category.isError &&
      state.delete_product_sub_category.message !== ""
    ) {
      successToaster(state.delete_product_sub_category.message);
      navigate("/product-sub-categories");
      dispatch({
        type: RESET_STATE,
        payload: { state: "product-sub-categories" },
      });
    } else if (
      state &&
      state.delete_product_sub_category &&
      state.delete_product_sub_category.isError
    ) {
      errorToaster(state.delete_product_sub_category.message);
    }
  }, [dispatch, navigate, state]);

  const addProductSubCatHandle = () => {
    dispatch({
      type: RESET_STATE,
      payload: { state: "product-sub-categories" },
    });
    navigate("/product-sub-categories/create");
  };

  const editProductSubCatHandle = () => {
    navigate(`/product-sub-categories/edit/${id}`);
  };

  const deleteProductSubCatHandle = () => {
    setModalOpen(true);
  };

  const modalHandleClose = () => {
    setModalOpen(false);
  };

  const onDeleteConfirmHandle = () => {
    dispatch({
      type: DELETE_PRODUCT_SUB_CATEGORY,
      payload: { id: id },
    });
  };

  return (
    <Box>
      <DashboardPage>
        <DeleteModal
          open={modalOpen}
          title="Product Sub-Category"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="prodsubcatpage_mainContainer">
          <Box className="prodsubcatpage_viewbuttonContainer">
            <ActiveButton
              title={configJSON.createProductSubCatTitleText}
              disabled={false}
              onClick={addProductSubCatHandle}
              style={{ width: "max-content" }}
            />
          </Box>
          <Box className="prodsubcatpage_textFieldContainer">
            <CustomTextField
              id="_id"
              type="text"
              label="Id"
              name="_id"
              value={formData._id}
              disabled={true}
            />
          </Box>
          <Box className="prodSubCategory_textFieldContainer">
            <CustomTextField
              id="sub_category_name"
              type="text"
              label="Sub-category name"
              name="sub_category_name"
              value={formData.sub_category_name}
              disabled={true}
            />
          </Box>
          <Box className="prodSubCategory_textFieldContainer">
            <CustomTextField
              id="product_category"
              type="text"
              label="Product category"
              name="product_category"
              value={formData.product_category}
              disabled={true}
            />
          </Box>
          <Divider className="prodsubcatpage_textFieldContainer" />
          <Typography className="prodsubcatpage_titleText">
            Product Sub Category Image
          </Typography>
          <Box className="prodsubcatpage_textFieldContainer">
            <ImageUpload
              profile_placeHolder={profile_placeHolder}
              title={""}
              description={""}
              imageUrl={formData.sub_category_image}
              name={""}
              view={true}
            />
          </Box>
          <Box className="prodsubcatpage_buttonSubContainer">
            <ActiveButton
              title={configJSON.editBtnTxt}
              disabled={false}
              onClick={editProductSubCatHandle}
              style={{ margin: "0px 15px 0px 0px" }}
            />
            <DeleteButton
              title={configJSON.deleteBtnTxt}
              disabled={false}
              onClick={deleteProductSubCatHandle}
              style={{ margin: "0px 0px 0px 15px" }}
            />
          </Box>
        </Box>
      </DashboardPage>
    </Box>
  );
};
export default ViewProductSubCategoryPage;
