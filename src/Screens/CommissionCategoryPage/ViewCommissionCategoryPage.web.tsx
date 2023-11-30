import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import DashboardPage from "../DashboardPage/DashboardPage.web";
import {
  DELETE_COMMISSION_TYPE,
  GET_COMMISSION_TYPE_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import { errorToaster, successToaster } from "../../Utils/common";
import { GetCommissionTypeByIdResponse } from "../../Modal/GetCommissionTypeById.modal";
import "./CommissionCategoryPage.web.css";

const configJSON = require("../../Constants/Commission");

const ViewCommissionCategoryPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const initialData = useMemo(() => {
    return {
      _id: "",
      commission_name: "",
      commission_sign: "",
    };
  }, []);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>(initialData);
  useEffect(() => {
    dispatch({
      type: GET_COMMISSION_TYPE_BY_ID,
      payload: { id: id },
    });
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
        payload: { state: "commission-categories" },
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
      temp._id = state.get_commission_type_by_id.commissionType._id;
      temp.commission_name =
        state.get_commission_type_by_id.commissionType.commission_name;
      temp.commission_sign =
        state.get_commission_type_by_id.commissionType.commission_sign;
      setFormData((prev: GetCommissionTypeByIdResponse) => ({
        ...prev,
        ...temp,
      }));
    }
  }, [initialData, state]);

  const addCommissionCategoryHandle = () => {
    dispatch({
      type: RESET_STATE,
      payload: { state: "commission-categories" },
    });
    navigate("/commission-categories/create");
  };
  const editCommissionCategoryHandle = () => {
    navigate(`/commission-categories/edit/${id}`);
  };
  const deleteCommissionCategoryHandle = () => {
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
    navigate("/commission-categories");
  };

  return (
    <Box>
      <DashboardPage>
        <DeleteModal
          open={modalOpen}
          title="Commission Category"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="commcatpage_mainContainer">
          <Box className="commcatpage_viewbuttonContainer">
            <ActiveButton
              title={configJSON.createCommissionCatTitleText}
              disabled={false}
              onClick={addCommissionCategoryHandle}
              style={{ width: "max-content" }}
            />
          </Box>
          <Box className="commcatpage_textFieldContainer">
            <CustomTextField
              id="_id"
              type="text"
              label="Id"
              name="_id"
              value={formData._id}
              disabled={true}
            />
          </Box>
          <Box className="commcatpage_textFieldContainer">
            <CustomTextField
              id="commission_name"
              type="text"
              label="Commission name"
              name="commission_name"
              value={formData.commission_name}
              disabled={true}
            />
          </Box>
          <Box className="commcatpage_textFieldContainer">
            <CustomTextField
              id="commission_sign"
              type="text"
              label="Commission sign"
              name="commission_sign"
              value={formData.commission_sign}
              disabled={true}
            />
          </Box>
          <Box className="commcatpage_buttonSubContainer">
            <ActiveButton
              title={configJSON.editBtnTxt}
              disabled={false}
              onClick={editCommissionCategoryHandle}
              style={{ margin: "0px 15px 0px 0px" }}
            />
            <DeleteButton
              title={configJSON.deleteBtnTxt}
              disabled={false}
              onClick={deleteCommissionCategoryHandle}
              style={{ margin: "0px 0px 0px 15px" }}
            />
          </Box>
        </Box>
      </DashboardPage>
    </Box>
  );
};
export default ViewCommissionCategoryPage;
