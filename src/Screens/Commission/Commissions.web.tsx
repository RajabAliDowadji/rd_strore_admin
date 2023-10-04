import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../Dashboard/Dashboard.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import {
  DELETE_COMMISSION,
  GET_COMMISSIONS,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import { Commission, GetCommission } from "../../Modal/GetCommissions.modal";
import NoDataFound from "../../Ui/Data/NoDataFound.web";
import { errorToaster, successToaster } from "../../Utils/common";
import "./Commissions.web.css";

const configJSON = require("../../Constants/Commission");

const Commissions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState<string>("");
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [commissions, setCommissions] = useState<GetCommission[]>([]);

  useEffect(() => {
    dispatch({
      type: GET_COMMISSIONS,
    });
  }, [dispatch]);

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

  useEffect(() => {
    if (
      state &&
      state.get_commissions &&
      state.get_commissions.commissions &&
      state.get_commissions.commissions.length !== 0
    ) {
      let tempArr: GetCommission[] = [];
      state.get_commissions.commissions.map((commission: Commission) =>
        tempArr.push({
          _id: commission._id,
          commission_name: commission.commission_type.commission_name,
          commission_sign: commission.commission_type.commission_sign,
          product_title: commission.product.product_title,
          product_price: commission.product.product_price,
          commission: commission.commission,
        })
      );
      setCommissions(tempArr);
    } else if (
      state &&
      state.get_commissions &&
      state.get_commissions.commissions &&
      state.get_commissions.commissions.length === 0
    ) {
      setCommissions([]);
    }
  }, [state]);

  const addCommissionTypeHandle = () => {
    navigate("/commissions/create");
  };
  const editCommissionTypeHandle = (id: string) => {
    navigate(`/commissions/edit/${id}`);
  };
  const viewCommissionTypeHandle = (id: string) => {
    navigate(`/commissions/view/${id}`);
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
      type: DELETE_COMMISSION,
      payload: { id: id },
    });
    setModalOpen(false);
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
          {commissions.length === 0 ? (
            <NoDataFound />
          ) : (
            <DataTable
              rows={commissions}
              columns={configJSON.commissionColumns}
              onViewClick={viewCommissionTypeHandle}
              onEditClick={editCommissionTypeHandle}
              onDeleteClick={deleteBtnClickHandle}
              isAction={true}
            />
          )}
        </Box>
      </Dashboard>
    </Box>
  );
};

export default Commissions;
