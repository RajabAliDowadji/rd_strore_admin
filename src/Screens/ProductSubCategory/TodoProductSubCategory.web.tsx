import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import CancelButton from "../../Ui/Button/CancelButton.web";
import { errorToaster, isEmpty, successToaster } from "../../Utils/common";
import { dropDownValidate } from "../../Validations/dropDownValidate.web";
import DropDown from "../../Ui/DropDown/DropDown.web";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_PRODUCT_SUB_CATEGORY,
  DELETE_PRODUCT_SUB_CATEGORY,
  EDIT_PRODUCT_SUB_CATEGORY,
  GET_PRODUCT_CATEGORIES,
  GET_PRODUCT_SUB_CATEGORY_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import { ProductCategory } from "../../Modal/GetProductCategories.modal";
import "./ProductSubCategories.web.css";
import { GetProductSubCategoryByIdResponse } from "../../Modal/GetProductSubCategoryById.modal";

const configJSON = require("../../Constants/Products");

const TodoProductSubCategory = () => {
  const initialData = useMemo(() => {
    return {
      sub_category_name: "",
      product_category: "",
      search_name: "",
    };
  }, []);
  let { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialData);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    []
  );
  const [dataError, setDataError] = useState({
    errors: {
      sub_category_name: false,
      product_category: false,
    },
    errorMsg: {
      sub_category_name: "",
      product_category: "",
    },
  });

  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_CATEGORIES,
    });
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch({
        type: GET_PRODUCT_SUB_CATEGORY_BY_ID,
        payload: { id: id },
      });
    }
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
        state.get_product_sub_category_by_id.productSubCategory.product_category._id;
      temp.search_name =
        state.get_product_sub_category_by_id.productSubCategory.search_name;
      setFormData((prev: GetProductSubCategoryByIdResponse) => ({
        ...prev,
        ...temp,
      }));
    }
  }, [initialData, state]);

  useEffect(() => {
    if (
      state &&
      state.add_edit_product_sub_category &&
      state.add_edit_product_sub_category.productSubCategory &&
      state.add_edit_product_sub_category.productSubCategory !== null &&
      !state.add_edit_product_sub_category.isError &&
      state.add_edit_product_sub_category.message !== ""
    ) {
      successToaster(state.add_edit_product_sub_category.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "product-sub-categories" },
      });
      navigate("/product-sub-categories");
    }
  }, [dispatch, navigate, state]);

  useEffect(() => {
    if (
      state &&
      state.get_product_categories &&
      state.get_product_categories.productCategories &&
      state.get_product_categories.productCategories.length !== 0
    ) {
      let tempArr: ProductCategory[] = [];
      state.get_product_categories.productCategories.map(
        (productCategory: ProductCategory) =>
          tempArr.push({
            _id: productCategory._id,
            category_name: productCategory.category_name,
            product_type: productCategory.product_type,
            search_name: productCategory.search_name,
          })
      );
      setProductCategories(tempArr);
    }
  }, [state]);

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

  useEffect(() => {
    const route = location.pathname.split("/");
    if (route && route.length > 0) {
      if (route[2] === "create") {
        setIsEdit(false);
      } else {
        setIsEdit(true);
      }
    }
  }, [location]);

  const cancelPlaceHandle = () => {
    navigate("/product-sub-categories");
  };
  const deletePlaceHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };

  const inputChangeHandle = (fieldName: string, event: any) => {
    let isValid = isEmpty(fieldName, event.target.value);
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setDataError((prev) => ({
      ...prev,
      errors: { ...dataError.errors, [event.target.name]: isValid.status },
      errorMsg: {
        ...dataError.errorMsg,
        [event.target.name]: isValid.message,
      },
    }));
  };

  const optionalInputChangeHandle = (event: any) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const dropDownOnChangeHandle = (
    fieldName: string,
    keyName: string,
    values: any
  ) => {
    const isValid = dropDownValidate(fieldName, values);
    setFormData((prev) => ({
      ...prev,
      [keyName]: values[0]._id,
    }));
    setDataError((prev) => ({
      ...prev,
      errors: { ...dataError.errors, [keyName]: isValid.status },
      errorMsg: {
        ...dataError.errorMsg,
        [keyName]: isValid.message,
      },
    }));
  };
  const formSubmitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isProdCatValid = isEmpty(
      "Sub-category name",
      formData.sub_category_name
    );
    const isProdTypeValid = dropDownValidate(
      "Product category",
      formData.product_category
    );
    if (isProdCatValid.status || isProdTypeValid.status) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          sub_category_name: isProdCatValid.status,
          product_category: isProdTypeValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          sub_category_name: isProdCatValid.message,
          product_category: isProdTypeValid.message,
        },
      }));
    } else {
      if (isEdit) {
        dispatch({
          type: EDIT_PRODUCT_SUB_CATEGORY,
          payload: { id: id, values: formData },
        });
      } else {
        dispatch({
          type: ADD_PRODUCT_SUB_CATEGORY,
          payload: formData,
        });
      }
    }
  };

  const onDeleteConfirmHandle = () => {
    dispatch({
      type: DELETE_PRODUCT_SUB_CATEGORY,
      payload: { id: id },
    });
  };

  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Product category"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="prodSubCategory_mainContainer">
          <Box className="prodSubCategory_titleContainer">
            <Typography className="prodSubCategory_titleText">
              {isEdit
                ? configJSON.editProductTypeTitleText
                : configJSON.createProductTypeTitleText}
            </Typography>
          </Box>
          <form onSubmit={formSubmitHandle}>
            <Box className="prodSubCategory_textFieldContainer">
              <CustomTextField
                id="sub_category_name"
                type="text"
                label="Sub-category name"
                name="sub_category_name"
                value={formData.sub_category_name}
                error={dataError.errors.sub_category_name}
                errorText={dataError.errorMsg.sub_category_name}
                onChange={inputChangeHandle.bind(this, "Sub-category name")}
              />
            </Box>
            <Box className="prodSubCategory_textFieldContainer">
              <DropDown
                label="Product category"
                name="product_category"
                multi={false}
                disabled={false}
                clearable={false}
                required={false}
                data={productCategories}
                values={formData.product_category}
                labelField={"category_name"}
                valueField={"_id"}
                placeholder="Please select product category"
                error={dataError.errors.product_category}
                errorText={dataError.errorMsg.product_category}
                onChange={dropDownOnChangeHandle.bind(
                  this,
                  "Product category",
                  "product_category"
                )}
              />
            </Box>
            <Box className="prodSubCategory_textFieldContainer">
              <CustomTextField
                id="search_name"
                type="text"
                label="Search name"
                name="search_name"
                value={formData.search_name}
                onChange={optionalInputChangeHandle}
              />
            </Box>
            <Box className="prodSubCategory_buttonSubContainer">
              {isEdit ? (
                <Box className="prodSubCategory_BtnContainer">
                  <ActiveButton
                    type="submit"
                    title="Update"
                    disabled={false}
                    style={{ width: "205px", margin: "0px 15px 0px 0px" }}
                  />
                  <DeleteButton
                    title="Delete"
                    disabled={false}
                    style={{ width: "205px", margin: "0px 0px 0px 15px" }}
                    onClick={deletePlaceHandle}
                  />
                </Box>
              ) : (
                <Box className="prodSubCategory_BtnContainer">
                  <ActiveButton
                    type="submit"
                    title="Save"
                    disabled={false}
                    style={{ width: "205px", margin: "0px 15px 0px 0px" }}
                  />
                  <CancelButton
                    title="Cancel"
                    disabled={false}
                    style={{ width: "205px", margin: "0px 0px 0px 15px" }}
                    onClick={cancelPlaceHandle}
                  />
                </Box>
              )}
            </Box>
          </form>
        </Box>
      </Dashboard>
    </Box>
  );
};
export default TodoProductSubCategory;
