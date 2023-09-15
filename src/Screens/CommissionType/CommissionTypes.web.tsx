import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../Dashboard/Dashboard.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import { GET_COMMISSION_TYPES } from "../../Hooks/Saga/Constant";
import { CommissionType } from "../../Modal/CommissionTypes.modal";
import "./CommissionTypes.web.css";

const configJSON = require("../../Constants/Commission");

const CommissionTypes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [commissionTypes, setCommissionTypes] = useState<CommissionType[]>([]);
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
      setCommissionTypes(tempArr);
    }
  }, [state]);
  const addCommissionTypeHandle = () => {
    navigate("/commission-types/create");
  };
  const editCommissionTypeHandle = (id: string) => {
    navigate(`/commission-types/edit/${id}`);
  };
  const viewCommissionTypeHandle = (id: string) => {
    navigate(`/commission-types/view/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/commission-types");
    setModalOpen(false);
    //TODO DELETE COMMISSION TYPE API CALL
  };
  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Commission Type"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="commissionType_mainContainer">
          <Box className="commissionType_buttonContainer">
            <ActiveButton
              title={configJSON.commissionTypeBtnTxt}
              disabled={false}
              onClick={addCommissionTypeHandle}
            />
          </Box>
          <DataTable
            rows={commissionTypes}
            columns={configJSON.commissionTypeColumns}
            onViewClick={viewCommissionTypeHandle}
            onEditClick={editCommissionTypeHandle}
            onDeleteClick={deleteBtnClickHandle}
            isAction={true}
          />
        </Box>
      </Dashboard>
    </Box>
  );
};

export default CommissionTypes;
