import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import {
  DELETE_COMMISSION_TYPE,
  GET_COMMISSION_TYPES,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { errorToaster, successToaster } from "../../Utils/common";
import NoDataFound from "../../Ui/Data/NoDataFound.web";
import DashboardPage from "../DashboardPage/DashboardPage.web";
import { CommissionType } from "../../Modal/GetCommissionTypes.modal";
import "./CommissionCategoryPage.web.css";

const configJSON = require("../../Constants/Commission");

const CommissionCategoryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [commissionCategories, setCommissionCategories] = useState<
    CommissionType[]
  >([]);
  const [id, setId] = useState<string>("");
  useEffect(() => {
    dispatch({
      type: GET_COMMISSION_TYPES,
    });
  }, [dispatch]);
  useEffect(() => {
    if (
      state &&
      state.get_commission_types &&
      state.get_commission_types.commissionTypes &&
      state.get_commission_types.commissionTypes.length !== 0
    ) {
      let tempArr: CommissionType[] = [];
      state.get_commission_types.commissionTypes.map(
        (commissionType: CommissionType) =>
          tempArr.push({
            _id: commissionType._id,
            commission_name: commissionType.commission_name,
            commission_sign: commissionType.commission_sign,
          })
      );
      setCommissionCategories(tempArr);
    } else if (
      state &&
      state.get_commission_types &&
      state.get_commission_types.commissionTypes &&
      state.get_commission_types.commissionTypes.length === 0
    ) {
      setCommissionCategories([]);
    }
  }, [state]);

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

  const addCommissionCategoryHandle = () => {
    navigate("/commission-categories/create");
  };
  const editCommissionCategoryHandle = (id: string) => {
    navigate(`/commission-categories/edit/${id}`);
  };
  const viewCommissionCategoryHandle = (id: string) => {
    navigate(`/commission-categories/view/${id}`);
  };
  const deleteBtnClickHandle = (id: string) => {
    setId(id);
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
    setModalOpen(false);
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
        <Box className="commcatpage_buttonContainer">
          <Typography className="commcatpage_maintitleText">
            Commission Category
          </Typography>
          <ActiveButton
            title={configJSON.commissionCatBtnTxt}
            disabled={false}
            onClick={addCommissionCategoryHandle}
            style={{ width: "max-content" }}
          />
        </Box>
        {commissionCategories.length === 0 ? (
          <NoDataFound />
        ) : (
          <DataTable
            rows={commissionCategories}
            columns={configJSON.commissionCatColumns}
            onViewClick={viewCommissionCategoryHandle}
            onEditClick={editCommissionCategoryHandle}
            onDeleteClick={deleteBtnClickHandle}
            isAction={true}
          />
        )}
      </DashboardPage>
    </Box>
  );
};

export default CommissionCategoryPage;
