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
  ADD_COMMISSION_TYPE,
  DELETE_COMMISSION_TYPE,
  EDIT_COMMISSION_TYPE,
  GET_COMMISSION_TYPE_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import { GetCommissionTypeByIdResponse } from "../../Modal/GetCommissionTypeById.modal";
import "./CommissionTypes.web.css";

const configJSON = require("../../Constants/Commission");

const TodoCommissionType = () => {
  const initialData = useMemo(() => {
    return {
      commission_name: "",
      commission_sign: "",
    };
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  let { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialData);
  const [dataError, setDataError] = useState({
    errors: {
      commission_name: false,
      commission_sign: false,
    },
    errorMsg: {
      commission_name: "",
      commission_sign: "",
    },
  });
  useEffect(() => {
    if (
      state &&
      state.add_edit_commission_type &&
      state.add_edit_commission_type.commissionType &&
      state.add_edit_commission_type.commissionType !== null &&
      !state.add_edit_commission_type.isError &&
      state.add_edit_commission_type.message !== ""
    ) {
      successToaster(state.add_edit_commission_type.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "commission-types" },
      });
      navigate("/commission-types");
    }
  }, [dispatch, navigate, state]);
  useEffect(() => {
    if (id) {
      dispatch({
        type: GET_COMMISSION_TYPE_BY_ID,
        payload: { id: id },
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (
      state &&
      state.delete_commission_type &&
      !state.delete_commission_type.isError &&
      state.delete_commission_type.message !== ""
    ) {
      successToaster(state.delete_commission_type.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "commission-types" },
      });
    } else if (
      state &&
      state.delete_commission_type &&
      state.delete_commission_type.isError
    ) {
      errorToaster(state.delete_commission_type.message);
    }
  }, [dispatch, navigate, state]);

  useEffect(() => {
    if (
      state &&
      state.get_commission_type_by_id &&
      state.get_commission_type_by_id.commissionType &&
      state.get_commission_type_by_id.commissionType !== null
    ) {
      let temp: GetCommissionTypeByIdResponse = initialData;
      temp.commission_name =
        state.get_commission_type_by_id.commissionType.commission_name;
      temp.commission_sign =
        state.get_commission_type_by_id.commissionType.commission_sign;
      setFormData((prev: GetCommissionTypeByIdResponse) => ({
        ...prev,
        ...temp,
      }));
    } else if (state.get_commission_type_by_id.isError) {
      errorToaster(state.get_commission_type_by_id.message);
    }
  }, [id, initialData, state]);

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

  const cancelcommissionTypeHandle = () => {
    navigate("/commission-types");
  };

  const deletecommissionTypeHandle = () => {
    setModalOpen(true);
  };

  const modalHandleClose = () => {
    setModalOpen(false);
  };

  const onDeleteConfirmHandle = () => {
    dispatch({
      type: DELETE_COMMISSION_TYPE,
      payload: { id: id },
    });
    navigate("/commission-types");
    //TODO DELETE SHOP CATEGORY API CALL
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
    const isCommissionNameValid = isEmpty(
      "Commisssion name",
      formData.commission_name
    );
    const isCommissionSignValid = isEmpty(
      "Commisssion sign",
      formData.commission_sign
    );
    if (isCommissionNameValid.status || isCommissionSignValid.status) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          commission_name: isCommissionNameValid.status,
          commission_sign: isCommissionSignValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          commission_name: isCommissionNameValid.message,
          commission_sign: isCommissionSignValid.message,
        },
      }));
    } else {
      if (isEdit) {
        dispatch({
          type: EDIT_COMMISSION_TYPE,
          payload: { id: id, values: formData },
        });
      } else {
        dispatch({
          type: ADD_COMMISSION_TYPE,
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
          title="Commission type"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="commissionType_mainContainer">
          <Box className="commissionType_titleContainer">
            <Typography className="commissionType_titleText">
              {isEdit
                ? configJSON.editCommissionTypeTitleText
                : configJSON.createCommissionTypeTitleText}
            </Typography>
          </Box>
          <form onSubmit={formSubmitHandle}>
            <Box className="commissionType_textFieldContainer">
              <CustomTextField
                id="commission_name"
                type="text"
                label="Commisssion name"
                name="commission_name"
                value={formData.commission_name}
                error={dataError.errors.commission_name}
                errorText={dataError.errorMsg.commission_name}
                onChange={inputChangeHandle.bind(this, "Commisssion name")}
              />
            </Box>
            <Box className="commissionType_textFieldContainer">
              <CustomTextField
                id="commission_sign"
                type="text"
                label="Commisssion sign"
                name="commission_sign"
                value={formData.commission_sign}
                error={dataError.errors.commission_sign}
                errorText={dataError.errorMsg.commission_sign}
                onChange={inputChangeHandle.bind(this, "Commisssion sign")}
              />
            </Box>
            <Box className="commissionType_buttonSubContainer">
              {isEdit ? (
                <Box className="commissionType_BtnContainer">
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
                    onClick={deletecommissionTypeHandle}
                  />
                </Box>
              ) : (
                <Box className="commissionType_BtnContainer">
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
                    onClick={cancelcommissionTypeHandle}
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
export default TodoCommissionType;
