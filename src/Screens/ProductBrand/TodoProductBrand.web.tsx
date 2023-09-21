import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { dropDownValidate } from "../../Validations/dropDownValidate.web";
import DropDown from "../../Ui/DropDown/DropDown.web";
import CancelButton from "../../Ui/Button/CancelButton.web";
import { errorToaster, isEmpty, successToaster } from "../../Utils/common";
import { GetProductSubCategoriesColumns } from "../../Modal/GetProductSubCategories.modal";
import {
  ADD_PRODUCT_BRAND,
  DELETE_PRODUCT_BRAND,
  EDIT_PRODUCT_BRAND,
  GET_PRODUCT_BRAND_BY_ID,
  GET_PRODUCT_SUB_CATEGORIES,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import { useDispatch, useSelector } from "react-redux";
import "./ProductBrands.web.css";

const configJSON = require("../../Constants/Products");

const TodoProductBrand = () => {
  const initialData = useMemo(() => {
    return {
      brand_name: "",
      sub_category_ids: {
        sub_category: [],
      },
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
  const [productSubCategories, setProductSubCategories] = useState<
    GetProductSubCategoriesColumns[]
  >([]);
  const [dataError, setDataError] = useState({
    errors: {
      brand_name: false,
      sub_category_ids: false,
    },
    errorMsg: {
      brand_name: "",
      sub_category_ids: "",
    },
  });

  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_SUB_CATEGORIES,
    });
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch({
        type: GET_PRODUCT_BRAND_BY_ID,
        payload: { id: id },
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (
      state &&
      state.get_product_sub_categories &&
      state.get_product_sub_categories.productSubCategories &&
      state.get_product_sub_categories.productSubCategories.length !== 0
    ) {
      let tempArr: any[] = [];
      state.get_product_sub_categories.productSubCategories.map(
        (productCategory: any) =>
          tempArr.push({
            _id: productCategory._id,
            sub_category_name: productCategory.sub_category_name,
            category_name: productCategory.product_category.category_name,
          })
      );
      setProductSubCategories(tempArr);
    }
  }, [state]);

  useEffect(() => {
    if (
      state &&
      state.add_edit_product_brand &&
      state.add_edit_product_brand.productBrand &&
      state.add_edit_product_brand.productBrand !== null &&
      !state.add_edit_product_brand.isError &&
      state.add_edit_product_brand.message !== ""
    ) {
      successToaster(state.add_edit_product_brand.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "product-brands" },
      });
      navigate("/product-brands");
    }
  }, [dispatch, navigate, state]);

  useEffect(() => {
    if (
      state &&
      state.get_product_brand_by_id &&
      state.get_product_brand_by_id.productBrand &&
      state.get_product_brand_by_id.productBrand !== null
    ) {
      let temp: any = initialData;
      temp._id = state.get_product_brand_by_id.productBrand._id;
      temp.brand_name = state.get_product_brand_by_id.productBrand.brand_name;
      temp.sub_category_ids = {
        sub_category:
          state.get_product_brand_by_id.productBrand.sub_category_ids.sub_category.map(
            (value: any) => value._id
          ),
      };
      setFormData((prev: any) => ({
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

  const cancelProdBrandHandle = () => {
    navigate("/product-brands");
  };
  const deleteProdBrandHandle = () => {
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

  const dropDownOnChangeHandle = (
    fieldName: string,
    keyName: string,
    values: any
  ) => {
    const isValid = dropDownValidate(fieldName, values);
    const tempArr = values.map((value: any) => value._id);
    setFormData((prev) => ({
      ...prev,
      [keyName]: { sub_category: tempArr },
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
    const isProdBrandValid = isEmpty("Brand name", formData.brand_name);
    const isProdSubCatValid = dropDownValidate(
      "Product sub-categories",
      formData.sub_category_ids.sub_category
    );
    if (isProdBrandValid.status || isProdSubCatValid.status) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          brand_name: isProdBrandValid.status,
          sub_category_ids: isProdSubCatValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          brand_name: isProdBrandValid.message,
          sub_category_ids: isProdSubCatValid.message,
        },
      }));
    } else {
      if (isEdit) {
        dispatch({
          type: EDIT_PRODUCT_BRAND,
          payload: { id: id, values: formData },
        });
      } else {
        dispatch({
          type: ADD_PRODUCT_BRAND,
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
          title="Product brand"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="prodBrand_mainContainer">
          <Box className="prodBrand_titleContainer">
            <Typography className="prodBrand_titleText">
              {isEdit
                ? configJSON.editProductBrandTitleText
                : configJSON.createProductBrandTitleText}
            </Typography>
          </Box>
          <form onSubmit={formSubmitHandle}>
            <Box className="prodBrand_textFieldContainer">
              <CustomTextField
                id="brand_name"
                type="text"
                label="Brand name"
                name="brand_name"
                value={formData.brand_name}
                error={dataError.errors.brand_name}
                errorText={dataError.errorMsg.brand_name}
                onChange={inputChangeHandle.bind(this, "Brand name")}
              />
            </Box>
            <Box className="prodBrand_textFieldContainer">
              <DropDown
                label="Product sub-categories"
                name="sub_category_ids"
                multi={true}
                disabled={false}
                clearable={false}
                required={false}
                labelField={"sub_category_name"}
                valueField={"_id"}
                data={productSubCategories}
                values={formData.sub_category_ids.sub_category}
                placeholder="Please select product sub-categories"
                error={dataError.errors.sub_category_ids}
                errorText={dataError.errorMsg.sub_category_ids}
                onChange={dropDownOnChangeHandle.bind(
                  this,
                  "Product sub-categories",
                  "sub_category_ids"
                )}
              />
            </Box>
            <Box className="prodBrand_buttonSubContainer">
              {isEdit ? (
                <Box className="prodBrand_BtnContainer">
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
                    onClick={deleteProdBrandHandle}
                  />
                </Box>
              ) : (
                <Box className="prodBrand_BtnContainer">
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
                    onClick={cancelProdBrandHandle}
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
export default TodoProductBrand;
