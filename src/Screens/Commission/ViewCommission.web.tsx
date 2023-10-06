import React, { useEffect, useMemo, useState } from "react";
import Dashboard from "../Dashboard/Dashboard.web";
import { Box } from "@material-ui/core";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import "./Commissions.web.css";
import { useDispatch, useSelector } from "react-redux";
import { errorToaster, successToaster } from "../../Utils/common";
import {
  DELETE_COMMISSION,
  GET_COMMISSION_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import { GetCommissionByIdViewResponse } from "../../Modal/GetCommissionById.modal";

const configJSON = require("../../Constants/Commission");

const ViewCommission = () => {
  const initialData = useMemo(() => {
    return {
      _id: "",
      commission_name: "",
      commission_sign: "",
      commission: "",
      product_title: "",
      product_MRP_price: "",
      product_price: "",
      commission_price: "",
    };
  }, []);
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (id) {
      dispatch({
        type: GET_COMMISSION_BY_ID,
        payload: { id: id },
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (
      state &&
      state.get_commission_by_id &&
      state.get_commission_by_id.commission &&
      state.get_commission_by_id.commission !== null
    ) {
      let temp: GetCommissionByIdViewResponse = initialData;
      temp._id = state.get_commission_by_id.commission._id;
      temp.commission = state.get_commission_by_id.commission.commission;
      temp.commission_name =
        state.get_commission_by_id.commission.commission_type.commission_name;
      temp.commission_sign =
        state.get_commission_by_id.commission.commission_type.commission_sign;
      temp.product_title =
        state.get_commission_by_id.commission.product.product_title;
      temp.product_MRP_price =
        state.get_commission_by_id.commission.product.product_MRP_price;
      temp.product_price =
        state.get_commission_by_id.commission.product.product_price;
      temp.commission_price =
        state.get_commission_by_id.commission.commission_price;
      setFormData((prev: GetCommissionByIdViewResponse) => ({
        ...prev,
        ...temp,
      }));
    } else if (state.get_commission_type_by_id.isError) {
      errorToaster(state.get_commission_type_by_id.message);
    }
  }, [initialData, state]);

  useEffect(() => {
    if (
      state &&
      state.delete_commission &&
      !state.delete_commission.isError &&
      state.delete_commission.message !== ""
    ) {
      successToaster(state.delete_commission.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "commissions" },
      });
      navigate("/commissions");
    } else if (
      state &&
      state.delete_commission &&
      state.delete_commission.isError
    ) {
      errorToaster(state.delete_commission.message);
    }
  }, [dispatch, navigate, state]);

  const addCommissionTypeHandle = () => {
    navigate("/commissions/create");
  };
  const editCommissionTypeHandle = () => {
    navigate(`/commissions/edit/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    dispatch({
      type: DELETE_COMMISSION,
      payload: { id: id },
    });
  };
  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Commission"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="commissions_mainContainer">
          <Box className="commissions_buttonContainer">
            <ActiveButton
              title={configJSON.commissionBtnTxt}
              disabled={false}
              onClick={addCommissionTypeHandle}
            />
          </Box>
          <Box>
            <Box className="commissions_textFieldContainer">
              <CustomTextField
                id="_id"
                type="text"
                label="Id"
                name="_id"
                value={formData._id}
                disabled={true}
              />
            </Box>
            <Box className="commissions_textFieldContainer">
              <CustomTextField
                id="commission_name"
                type="text"
                label="Commission name"
                name="commission_name"
                value={formData.commission_name}
                disabled={true}
              />
            </Box>
            <Box className="commissions_textFieldContainer">
              <CustomTextField
                id="commission_sign"
                type="text"
                label="Commission sign"
                name="commission_sign"
                value={formData.commission_sign}
                disabled={true}
              />
            </Box>
            <Box className="commissions_textFieldContainer">
              <CustomTextField
                id="commission"
                type="text"
                label="Commission"
                name="commission"
                value={formData.commission}
                disabled={true}
              />
            </Box>
            <Box className="commissions_textFieldContainer">
              <CustomTextField
                id="product_title"
                type="text"
                label="Product title"
                name="product_title"
                value={formData.product_title}
                disabled={true}
              />
            </Box>
            <Box className="commissions_textFieldContainer">
              <CustomTextField
                id="product_MRP_price"
                type="number"
                label="Product MRP price"
                name="product_MRP_price"
                value={formData.product_MRP_price.toString()}
                disabled={true}
              />
            </Box>
            <Box className="commissions_textFieldContainer">
              <CustomTextField
                id="product_price"
                type="number"
                label="Product price"
                name="product_price"
                value={formData.product_price.toString()}
                disabled={true}
              />
            </Box>
            <Box className="commissions_textFieldContainer">
              <CustomTextField
                id="commission_price"
                type="text"
                label="Commission price"
                name="commission_price"
                value={formData.commission_price.toString()}
                disabled={true}
              />
            </Box>
          </Box>
          <Box className="commissions_buttonSubContainer">
            <ActiveButton
              title={configJSON.editBtnTxt}
              disabled={false}
              onClick={editCommissionTypeHandle}
              style={{ width: "205px", margin: "0px 15px 0px 0px" }}
            />
            <DeleteButton
              title={configJSON.deleteBtnTxt}
              disabled={false}
              onClick={deleteBtnClickHandle}
              style={{ width: "205px", margin: "0px 0px 0px 15px" }}
            />
          </Box>
        </Box>
      </Dashboard>
    </Box>
  );
};

export default ViewCommission;
