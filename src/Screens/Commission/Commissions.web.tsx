import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../Dashboard/Dashboard.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DataTable from "../../components/DataTable/DataTable.web";
import { GET_COMMISSIONS } from "../../Hooks/Saga/Constant";
import "./Commissions.web.css";
import { Commission, GetCommission } from "../../Modal/GetCommissions.modal";

const configJSON = require("../../Constants/Commission");

const Commissions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
            rows={commissions}
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
