import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import CancelButton from "../../Ui/Button/CancelButton.web";
import {
  errorToaster,
  isEmpty,
  isNumEmpty,
  successToaster,
} from "../../Utils/common";
import { rangeValidate } from "../../Validations/rangeValidate.web";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_SHOP_CATEGORY,
  GET_SHOP_CATEGORY_BY_ID,
  RESET_STATE,
  ADD_SHOP_CATEGORY,
  EDIT_SHOP_CATEGORY,
} from "../../Hooks/Saga/Constant";
import { GetShopCategoryByIdResponse } from "../../Modal/GetShopCategoryById.modal";
import "./ShopCategories.web.css";

const configJSON = require("../../Constants/Shop");

const TodoShopCategory = () => {
  let { id } = useParams();
  const initialData = useMemo(() => {
    return {
      category_name: "",
      lower_range: 0,
      upper_range: 0,
    };
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialData);
  const state = useSelector((state: any) => state);
  const [dataError, setDataError] = useState({
    errors: {
      category_name: false,
      lower_range: false,
      upper_range: false,
    },
    errorMsg: {
      category_name: "",
      lower_range: "",
      upper_range: "",
    },
  });
  useEffect(() => {
    if (id) {
      dispatch({
        type: GET_SHOP_CATEGORY_BY_ID,
        payload: { id: id },
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (
      state &&
      state.get_shop_category_by_id &&
      state.get_shop_category_by_id.shopCategory &&
      state.get_shop_category_by_id.shopCategory !== null
    ) {
      let temp: GetShopCategoryByIdResponse = initialData;
      temp._id = state.get_shop_category_by_id.shopCategory._id;
      temp.category_name =
        state.get_shop_category_by_id.shopCategory.category_name;
      temp.lower_range = state.get_shop_category_by_id.shopCategory.lower_range;
      temp.upper_range = state.get_shop_category_by_id.shopCategory.upper_range;
      setFormData((prev: GetShopCategoryByIdResponse) => ({
        ...prev,
        ...temp,
      }));
    } else if (state.get_shop_category_by_id.isError) {
      errorToaster(state.get_shop_category_by_id.message);
    }
  }, [initialData, state]);

  useEffect(() => {
    if (
      state &&
      state.delete_shop_category &&
      !state.delete_shop_category.isError &&
      state.delete_shop_category.message !== ""
    ) {
      successToaster(state.delete_shop_category.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "shop_category" },
      });
    } else if (
      state &&
      state.delete_shop_category &&
      state.delete_shop_category.isError
    ) {
      errorToaster(state.delete_shop_category.message);
    }
  }, [dispatch, navigate, id, state]);

  useEffect(() => {
    if (
      state &&
      state.add_edit_shop_category &&
      state.add_edit_shop_category.shopCategory &&
      state.add_edit_shop_category.shopCategory !== null &&
      !state.add_edit_shop_category.isError &&
      state.add_edit_shop_category.message !== ""
    ) {
      successToaster(state.add_edit_shop_category.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "shop_category" },
      });
      navigate("/shop-categories");
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

  const cancelshopCategoryHandle = () => {
    navigate("/shop-categories");
  };

  const deleteshopCategoryHandle = () => {
    setModalOpen(true);
  };

  const modalHandleClose = () => {
    setModalOpen(false);
  };

  const onDeleteConfirmHandle = () => {
    dispatch({
      type: DELETE_SHOP_CATEGORY,
      payload: { id: id },
    });
    navigate("/shop-categories");
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

  const formSubmitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isCategoryValid = isEmpty("Category name", formData.category_name);
    const isLowerRangeValid = isNumEmpty("Lower range", formData.lower_range);
    let isUpperRangeValid = rangeValidate(
      formData.lower_range,
      formData.upper_range
    );
    if (
      isCategoryValid.status ||
      isLowerRangeValid.status ||
      isUpperRangeValid.status
    ) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          category_name: isCategoryValid.status,
          lower_range: isLowerRangeValid.status,
          upper_range: isUpperRangeValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          category_name: isCategoryValid.message,
          lower_range: isLowerRangeValid.message,
          upper_range: isUpperRangeValid.message,
        },
      }));
    } else {
      if (isEdit) {
        dispatch({
          type: EDIT_SHOP_CATEGORY,
          payload: { id: id, values: formData },
        });
      } else {
        dispatch({
          type: ADD_SHOP_CATEGORY,
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
          title="Shop category"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="shopCategory_mainContainer">
          <Box className="shopCategory_titleContainer">
            <Typography className="shopCategory_titleText">
              {isEdit
                ? configJSON.editShopCategoryTitleText
                : configJSON.createShopCategoryTitleText}
            </Typography>
          </Box>
          <form onSubmit={formSubmitHandle}>
            <Box className="shopCategory_textFieldContainer">
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
            <Box className="shopCategory_textFieldContainer">
              <CustomTextField
                id="lower_range"
                type="number"
                label="Lower range"
                name="lower_range"
                value={formData.lower_range.toString()}
                error={dataError.errors.lower_range}
                errorText={dataError.errorMsg.lower_range}
                onChange={inputChangeHandle.bind(this, "Lower range")}
              />
            </Box>
            <Box className="shopCategory_textFieldContainer">
              <CustomTextField
                id="upper_range"
                type="number"
                label="Upper range"
                name="upper_range"
                value={formData.upper_range.toString()}
                error={dataError.errors.upper_range}
                errorText={dataError.errorMsg.upper_range}
                onChange={inputChangeHandle.bind(this, "Upper range")}
              />
            </Box>
            <Box className="shopCategory_buttonSubContainer">
              {isEdit ? (
                <Box className="shopCategory_BtnContainer">
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
                    onClick={deleteshopCategoryHandle}
                  />
                </Box>
              ) : (
                <Box className="shopCategory_BtnContainer">
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
                    onClick={cancelshopCategoryHandle}
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
export default TodoShopCategory;
