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
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_PRODUCT_TYPE,
  DELETE_PRODUCT_TYPE,
  EDIT_PRODUCT_TYPE,
  GET_PRODUCT_TYPE_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import { GetProductTypeByIdResponse } from "../../Modal/GetProductTypeById.modal";
import "./ProductTypes.web.css";

const configJSON = require("../../Constants/Products");

const TodoProductType = () => {
  const initialData = useMemo(() => {
    return {
      type_name: "",
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
  const [dataError, setDataError] = useState({
    errors: {
      type_name: false,
    },
    errorMsg: {
      type_name: "",
    },
  });

  useEffect(() => {
    if (
      state &&
      state.add_edit_product_type &&
      state.add_edit_product_type.productType &&
      state.add_edit_product_type.productType !== null &&
      !state.add_edit_product_type.isError &&
      state.add_edit_product_type.message !== ""
    ) {
      successToaster(state.add_edit_product_type.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "product_type" },
      });
      navigate("/product-types");
    }
  }, [dispatch, navigate, state]);

  useEffect(() => {
    if (id) {
      dispatch({
        type: GET_PRODUCT_TYPE_BY_ID,
        payload: { id: id },
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (
      state &&
      state.get_product_type_by_id &&
      state.get_product_type_by_id.productType &&
      state.get_product_type_by_id.productType !== null
    ) {
      let temp: GetProductTypeByIdResponse = initialData;
      temp._id = state.get_product_type_by_id.productType._id;
      temp.type_name = state.get_product_type_by_id.productType.type_name;
      temp.search_name = state.get_product_type_by_id.productType.search_name;
      setFormData((prev: GetProductTypeByIdResponse) => ({
        ...prev,
        ...temp,
      }));
    }
  }, [initialData, state]);

  useEffect(() => {
    if (
      state &&
      state.delete_product_type &&
      !state.delete_product_type.isError &&
      state.delete_product_type.message !== ""
    ) {
      successToaster(state.delete_product_type.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "product_type" },
      });
    } else if (
      state &&
      state.delete_product_type &&
      state.delete_product_type.isError
    ) {
      errorToaster(state.delete_product_type.message);
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
    navigate("/product-types");
  };
  const deletePlaceHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };

  const onDeleteConfirmHandle = () => {
    dispatch({
      type: DELETE_PRODUCT_TYPE,
      payload: { id: id },
    });
    navigate("/product-types");
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

  const formSubmitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isProdTypeValid = isEmpty("Product type", formData.type_name);
    if (isProdTypeValid.status) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          type_name: isProdTypeValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          type_name: isProdTypeValid.message,
        },
      }));
    } else {
      if (isEdit) {
        dispatch({
          type: EDIT_PRODUCT_TYPE,
          payload: { id: id, values: formData },
        });
      } else {
        dispatch({
          type: ADD_PRODUCT_TYPE,
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
          title="Product type"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="productType_mainContainer">
          <Box className="productType_titleContainer">
            <Typography className="productType_titleText">
              {isEdit
                ? configJSON.editProductTypeTitleText
                : configJSON.createProductTypeTitleText}
            </Typography>
          </Box>
          <form onSubmit={formSubmitHandle}>
            <Box className="productType_textFieldContainer">
              <CustomTextField
                id="type_name"
                type="text"
                label="Product type"
                name="type_name"
                value={formData.type_name}
                error={dataError.errors.type_name}
                errorText={dataError.errorMsg.type_name}
                onChange={inputChangeHandle.bind(this, "Product type")}
              />
            </Box>
            <Box className="productType_textFieldContainer">
              <CustomTextField
                id="search_name"
                type="text"
                label="Search name"
                name="search_name"
                value={formData.search_name}
                onChange={optionalInputChangeHandle}
              />
            </Box>
            <Box className="productType_buttonSubContainer">
              {isEdit ? (
                <Box className="productType_BtnContainer">
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
                <Box className="productType_BtnContainer">
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
export default TodoProductType;
