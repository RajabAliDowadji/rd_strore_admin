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
  DELETE_PRODUCT_CATEGORY,
  GET_PRODUCT_CATEGORY_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import { errorToaster, successToaster } from "../../Utils/common";
import ImageUpload from "../../Ui/Image/ImageUpload.web";
import { GetProductCategoryByIdResponse } from "../../Modal/GetProductCategoryById.modal";
import { profile_placeHolder } from "../ShopPage/assets";
import "./ProductCategoryPage.web.css";

const configJSON = require("../../Constants/Products");

const ViewProductCategoryPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const initialData = useMemo(() => {
    return {
      _id: "",
      category_name: "",
      category_image: "",
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
      temp.category_image =
        state.get_product_category_by_id.productCategory.category_image.file_url;
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
        payload: { state: "product-categories" },
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

  const addProductCatHandle = () => {
    dispatch({
      type: RESET_STATE,
      payload: { state: "product-categories" },
    });
    navigate("/product-categories/create");
  };
  const editProductCatHandle = () => {
    navigate(`/product-categories/edit/${id}`);
  };
  const deleteProductCatHandle = () => {
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
      <DashboardPage>
        <DeleteModal
          open={modalOpen}
          title="Product Category"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="prodcatpage_mainContainer">
          <Box className="prodcatpage_viewbuttonContainer">
            <ActiveButton
              title={configJSON.createProductCatTitleText}
              disabled={false}
              onClick={addProductCatHandle}
              style={{ width: "max-content" }}
            />
          </Box>
          <Box className="prodcatpage_textFieldContainer">
            <CustomTextField
              id="_id"
              type="text"
              label="Id"
              name="_id"
              value={formData._id}
              disabled={true}
            />
          </Box>
          <Box className="prodcatpage_textFieldContainer">
            <CustomTextField
              id="category_name"
              type="text"
              label="Category name"
              name="category_name"
              value={formData.category_name}
              disabled={true}
            />
          </Box>
          <Divider className="prodcatpage_textFieldContainer" />
          <Typography className="prodcatpage_titleText">
            Product Category Image
          </Typography>
          <Box className="prodcatpage_textFieldContainer">
            <ImageUpload
              profile_placeHolder={profile_placeHolder}
              title={""}
              description={""}
              imageUrl={formData.category_image}
              name={""}
              view={true}
            />
          </Box>
          <Box className="prodcatpage_buttonSubContainer">
            <ActiveButton
              title={configJSON.editBtnTxt}
              disabled={false}
              onClick={editProductCatHandle}
              style={{ margin: "0px 15px 0px 0px" }}
            />
            <DeleteButton
              title={configJSON.deleteBtnTxt}
              disabled={false}
              onClick={deleteProductCatHandle}
              style={{ margin: "0px 0px 0px 15px" }}
            />
          </Box>
        </Box>
      </DashboardPage>
    </Box>
  );
};
export default ViewProductCategoryPage;
