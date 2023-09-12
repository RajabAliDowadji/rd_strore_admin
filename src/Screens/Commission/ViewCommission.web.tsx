import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard.web";
import { Box } from "@material-ui/core";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import "./Commissions.web.css";

const configJSON = require("../../Constants/Commission");

const ViewCommission = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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
    navigate("/commissions");
    //TODO DELETE SHOP CATEGORY API CALL
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
                value="64eafd3438f621bdc72a570b"
                disabled={true}
              />
            </Box>
            <Box className="commissions_textFieldContainer">
              <CustomTextField
                id="commission_name"
                type="text"
                label="Commission name"
                name="commission_name"
                value="Ruppess"
                disabled={true}
              />
            </Box>
            <Box className="commissions_textFieldContainer">
              <CustomTextField
                id="commission_sign"
                type="text"
                label="Commission sign"
                name="commission_sign"
                value="₹"
                disabled={true}
              />
            </Box>
            <Box className="commissions_textFieldContainer">
              <CustomTextField
                id="product_title"
                type="text"
                label="Product title"
                name="product_title"
                value="Amul Quality Ghee"
                disabled={true}
              />
            </Box>
            <Box className="commissions_textFieldContainer">
              <CustomTextField
                id="product_MRP_price"
                type="number"
                label="Product MRP price"
                name="product_MRP_price"
                value="600"
                disabled={true}
              />
            </Box>
            <Box className="commissions_textFieldContainer">
              <CustomTextField
                id="product_price"
                type="number"
                label="Product price"
                name="product_price"
                value="550"
                disabled={true}
              />
            </Box>
            <Box className="commissions_textFieldContainer">
              <CustomTextField
                id="product_size"
                type="text"
                label="Product size"
                name="product_size"
                value="1000g"
                disabled={true}
              />
            </Box>
            <Box className="commissions_textFieldContainer">
              <CustomTextField
                id="commission"
                type="text"
                label="Commission"
                name="commission"
                value="7"
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
