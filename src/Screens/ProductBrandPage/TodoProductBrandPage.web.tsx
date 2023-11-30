import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_PRODUCT_BRAND,
  DELETE_PRODUCT_BRAND,
  EDIT_PRODUCT_BRAND,
  GET_PRODUCT_BRAND_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import CancelButton from "../../Ui/Button/CancelButton.web";
import { errorToaster, isEmpty, successToaster } from "../../Utils/common";
import DashboardPage from "../DashboardPage/DashboardPage.web";
import "./ProductBrandPage.web.css";

const configJSON = require("../../Constants/Products");

const TodoProductBrandPage = () => {
  const initialData = useMemo(() => {
    return {
      brand_name: "",
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
  const [dataError, setDataError] = useState({
    errors: {
      brand_name: false,
    },
    errorMsg: {
      brand_name: "",
    },
  });

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

  const formSubmitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isProdBrandValid = isEmpty("Brand name", formData.brand_name);
    if (isProdBrandValid.status) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          brand_name: isProdBrandValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          brand_name: isProdBrandValid.message,
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
      <DashboardPage>
        <DeleteModal
          open={modalOpen}
          title="Product Brand"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="prodbrandpage_mainContainer">
          <Box className="prodbrandpage_titleContainer">
            <Typography className="prodbrandpage_titleText">
              {isEdit
                ? configJSON.editProductBrandTitleText
                : configJSON.createProductBrandTitleText}
            </Typography>
          </Box>
          <form onSubmit={formSubmitHandle}>
            <Box className="prodbrandpage_textFieldContainer">
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
            <Box className="prodbrandpage_buttonSubContainer">
              {isEdit ? (
                <Box className="prodbrandpage_BtnContainer">
                  <ActiveButton
                    type="submit"
                    title="Update"
                    disabled={false}
                    style={{ margin: "0px 15px 0px 0px" }}
                  />
                  <DeleteButton
                    title="Delete"
                    disabled={false}
                    style={{ margin: "0px 0px 0px 15px" }}
                    onClick={deleteProdBrandHandle}
                  />
                </Box>
              ) : (
                <Box className="prodbrandpage_BtnContainer">
                  <ActiveButton
                    type="submit"
                    title="Save"
                    disabled={false}
                    style={{ margin: "0px 15px 0px 0px" }}
                  />
                  <CancelButton
                    title="Cancel"
                    disabled={false}
                    style={{ margin: "0px 0px 0px 15px" }}
                    onClick={cancelProdBrandHandle}
                  />
                </Box>
              )}
            </Box>
          </form>
        </Box>
      </DashboardPage>
    </Box>
  );
};
export default TodoProductBrandPage;
