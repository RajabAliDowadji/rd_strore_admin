import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_PRODUCT_TYPE,
  GET_PRODUCT_TYPE_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import { GetProductTypeByIdResponse } from "../../Modal/GetProductTypeById.modal";
import { errorToaster, successToaster } from "../../Utils/common";
import "./ProductTypes.web.css";

const configJSON = require("../../Constants/Products");

const ViewProductType = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const initialData = useMemo(() => {
    return {
      _id: "",
      type_name: "",
      search_name: "",
    };
  }, []);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>(initialData);

  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_TYPE_BY_ID,
      payload: { id: id },
    });
  }, [dispatch, id]);

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
        payload: { state: "product-types" },
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

  const addProductTypeHandle = () => {
    dispatch({
      type: RESET_STATE,
      payload: { state: "product-types" },
    });
    navigate("/product-types/create");
  };
  const editProductTypeHandle = () => {
    navigate(`/product-types/edit/${id}`);
  };
  const deleteProductTypeHandle = () => {
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
          <Box className="productType_buttonContainer">
            <ActiveButton
              title={configJSON.productTypeBtnTxt}
              disabled={false}
              onClick={addProductTypeHandle}
            />
          </Box>
          <Box>
            <Box className="productType_textFieldContainer">
              <CustomTextField
                id="_id"
                type="text"
                label="Id"
                name="_id"
                value={formData._id}
                disabled={true}
              />
            </Box>
            <Box className="productType_textFieldContainer">
              <CustomTextField
                id="type_name"
                type="text"
                label="Type name"
                name="type_name"
                value={formData.type_name}
                disabled={true}
              />
            </Box>
            <Box className="productType_textFieldContainer">
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
          <Box className="productType_buttonSubContainer">
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
export default ViewProductType;
