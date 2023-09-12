import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard.web";
import { Box } from "@material-ui/core";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import { useNavigate } from "react-router-dom";
import "./Commissions.web.css";

const configJSON = require("../../Constants/Commission");

const Commissions = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const rows = [
    {
      _id: "64eb008ed511b1b9f1df47d5",
      commission_type: {
        commission_name: "Percentage",
        commission_sign: "%",
      },
      product: {
        product_title: "Amul Quality Ghee",
        product_price: 550,
      },
      commission: 2,
    },
  ];
  const addCommissionTypeHandle = () => {
    navigate("/commissions/create");
  };
  const editCommissionTypeHandle = (id: string) => {
    navigate(`/commissions/edit/${id}`);
  };
  const viewCommissionTypeHandle = (id: string) => {
    navigate(`/commissions/view/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/commissions");
    setModalOpen(false);
    //TODO DELETE COMMISSION TYPE API CALL
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
          <DataTable
            rows={rows}
            columns={configJSON.commissionColumns}
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

export default Commissions;
