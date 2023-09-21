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
import "./ProductCategories.web.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_PRODUCT_CATEGORY,
  DELETE_PRODUCT_CATEGORY,
  EDIT_PRODUCT_CATEGORY,
  GET_PRODUCT_CATEGORY_BY_ID,
  GET_PRODUCT_TYPES,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import { GetProductCategoryByIdResponse } from "../../Modal/GetProductCategoryById.modal";
import { ProductType } from "../../Modal/GetProductCategories.modal";

const configJSON = require("../../Constants/Products");

const TodoProductCategory = () => {
  const initialData = useMemo(() => {
    return {
      category_name: "",
      product_type: "",
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
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [dataError, setDataError] = useState({
    errors: {
      category_name: false,
      product_type: false,
    },
    errorMsg: {
      category_name: "",
      product_type: "",
    },
  });

  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_TYPES,
    });
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch({
        type: GET_PRODUCT_CATEGORY_BY_ID,
        payload: { id: id },
      });
    }
  }, [dispatch, id]);

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

  useEffect(() => {
    if (
      state &&
      state.add_edit_product_category &&
      state.add_edit_product_category.productCategory &&
      state.add_edit_product_category.productCategory !== null &&
      !state.add_edit_product_category.isError &&
      state.add_edit_product_category.message !== ""
    ) {
      successToaster(state.add_edit_product_category.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "product-categories" },
      });
      navigate("/product-categories");
    }
  }, [dispatch, navigate, state]);

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
        state.get_product_category_by_id.productCategory.product_type._id;
      temp.search_name =
        state.get_product_category_by_id.productCategory.search_name;
      setFormData((prev: GetProductCategoryByIdResponse) => ({
        ...prev,
        ...temp,
      }));
    }
  }, [initialData, state]);

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
    navigate("/product-categories");
  };
  const deletePlaceHandle = () => {
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
    const isProdCatValid = isEmpty("Category name", formData.category_name);
    const isProdTypeValid = dropDownValidate(
      "Product type",
      formData.product_type
    );
    if (isProdCatValid.status || isProdTypeValid.status) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          category_name: isProdCatValid.status,
          product_type: isProdTypeValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          category_name: isProdCatValid.message,
          product_type: isProdTypeValid.message,
        },
      }));
    } else {
      if (isEdit) {
        dispatch({
          type: EDIT_PRODUCT_CATEGORY,
          payload: { id: id, values: formData },
        });
      } else {
        dispatch({
          type: ADD_PRODUCT_CATEGORY,
          payload: formData,
        });
      }
    }
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
        <Box className="prodCategory_mainContainer">
          <Box className="prodCategory_titleContainer">
            <Typography className="prodCategory_titleText">
              {isEdit
                ? configJSON.editProductTypeTitleText
                : configJSON.createProductTypeTitleText}
            </Typography>
          </Box>
          <form onSubmit={formSubmitHandle}>
            <Box className="prodCategory_textFieldContainer">
              <CustomTextField
                id="category_name"
                type="text"
                label="Category name"
                name="category_name"
                value={formData.category_name}
                error={dataError.errors.category_name}
                errorText={dataError.errorMsg.category_name}
                onChange={inputChangeHandle.bind(this, "Category name")}
              />
            </Box>
            <Box className="prodCategory_textFieldContainer">
              <DropDown
                label="Product type"
                name="product_type"
                multi={false}
                disabled={false}
                clearable={false}
                required={false}
                data={productTypes}
                labelField={"type_name"}
                valueField={"_id"}
                values={formData.product_type}
                placeholder="Please select product type"
                error={dataError.errors.product_type}
                errorText={dataError.errorMsg.product_type}
                onChange={dropDownOnChangeHandle.bind(
                  this,
                  "Product type",
                  "product_type"
                )}
              />
            </Box>
            <Box className="prodCategory_textFieldContainer">
              <CustomTextField
                id="search_name"
                type="text"
                label="Search name"
                name="search_name"
                value={formData.search_name}
                onChange={optionalInputChangeHandle}
              />
            </Box>
            <Box className="prodCategory_buttonSubContainer">
              {isEdit ? (
                <Box className="prodCategory_BtnContainer">
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
                <Box className="prodCategory_BtnContainer">
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
export default TodoProductCategory;
