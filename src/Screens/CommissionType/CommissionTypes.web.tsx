import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard.web";
import { Box } from "@material-ui/core";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import { useNavigate } from "react-router-dom";
import "./CommissionTypes.web.css";

const configJSON = require("../../Constants/Commission");

const CommissionTypes = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const rows = [
    {
      _id: "64eb008ed511b1b9f1df47d5",
      commission_name: "Ruppess",
      commission_sign: "₹",
    },
  ];
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
            rows={rows}
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
